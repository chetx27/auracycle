import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as DayPickerCalendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarDays, Heart, Droplets, Sparkles } from "lucide-react";
import { format, addDays, isSameDay, isBefore, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface TrackerSettings {
  lastPeriodStart: string | null; // ISO date
  cycleLength: number; // days
  periodLength: number; // days
}

interface DailyLog {
  date: string; // ISO date (yyyy-MM-dd)
  cramps: number; // 0-3
}

function iso(date: Date) { return format(date, "yyyy-MM-dd"); }
function parseIso(d: string) { const [y,m,dd]=d.split("-").map(Number); return new Date(y, m-1, dd); }

export default function Index() {
  const [settings, setSettings] = useLocalStorage<TrackerSettings>("aura:settings", {
    lastPeriodStart: null,
    cycleLength: 28,
    periodLength: 5,
  });
  const [logs, setLogs] = useLocalStorage<Record<string, DailyLog>>("aura:logs", {});
  const today = new Date();

  const lastStart = settings.lastPeriodStart ? parseIso(settings.lastPeriodStart) : null;
  const cycleLen = Math.max(20, Math.min(60, settings.cycleLength));
  const periodLen = Math.max(2, Math.min(10, settings.periodLength));

  function nextPeriodStart(from: Date) {
    if (!lastStart) return null;
    let d = new Date(lastStart);
    while (isBefore(d, from)) d = addDays(d, cycleLen);
    return d;
  }

  const nextStart = nextPeriodStart(today);
  const dayInCycle = useMemo(() => {
    if (!lastStart) return null;
    const diff = (differenceInCalendarDays(today, lastStart) % cycleLen + cycleLen) % cycleLen;
    return diff + 1; // 1-indexed
  }, [lastStart, today, cycleLen]);

  const ovulationDayNumber = useMemo(() => {
    if (cycleLen <= 0) return 14;
    const day = cycleLen - 14; // counting from last start
    return day < 1 ? 1 : day; // safety
  }, [cycleLen]);

  const phase = useMemo(() => {
    if (!dayInCycle) return null;
    if (dayInCycle <= periodLen) return "Period";
    if (dayInCycle === ovulationDayNumber) return "Ovulation";
    if (dayInCycle < ovulationDayNumber) return "Follicular";
    return "Luteal";
  }, [dayInCycle, periodLen, ovulationDayNumber]);

  const calendarModifiers = useMemo(() => {
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(addMonths(today, 1));
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const period: Date[] = [];
    const fertile: Date[] = [];
    const ovulation: Date[] = [];

    if (lastStart) {
      // generate windows within range
      let cursor = new Date(lastStart);
      while (isBefore(cursor, monthEnd)) {
        const next = new Date(cursor);
        // period window
        for (let i = 0; i < periodLen; i++) {
          const d = addDays(next, i);
          if (d >= monthStart && d <= monthEnd) period.push(d);
        }
        // ovulation and fertile window
        const ovu = addDays(cursor, ovulationDayNumber - 1);
        if (ovu >= monthStart && ovu <= monthEnd) ovulation.push(ovu);
        for (let i = -2; i <= 2; i++) {
          const d = addDays(ovu, i);
          if (d >= monthStart && d <= monthEnd) fertile.push(d);
        }
        cursor = addDays(cursor, cycleLen);
      }
    }

    const logged = Object.values(logs).map((l) => parseIso(l.date));

    return { period, fertile, ovulation, logged };
  }, [today, lastStart, cycleLen, periodLen, ovulationDayNumber, logs]);

  const todayKey = iso(today);
  const todayLog = logs[todayKey] ?? { date: todayKey, cramps: 0 };

  const updateLog = (next: DailyLog) => setLogs({ ...logs, [next.date]: next });

  const setLastStart = (d: Date | undefined) => {
    if (!d) return;
    setSettings({ ...settings, lastPeriodStart: iso(d) });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-rose-50 via-pink-50 to-teal-50">
      <section className="container py-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-fuchsia-600 to-violet-600">Gentle tracking. Real support.</h1>
            <p className="text-muted-foreground mt-2 max-w-prose">A minimalist period tracker for women and teens. Log cramps, understand your cycle phases, and chat for tips—calm, clear, and kind.</p>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" className="whitespace-nowrap"><CalendarDays className="mr-2" /> Set last period</Button>
              </PopoverTrigger>
              <PopoverContent className="p-2" align="end">
                <DayPickerCalendar
                  mode="single"
                  selected={lastStart ?? undefined}
                  onSelect={setLastStart}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Heart className="text-rose-500" /> Today's cycle</CardTitle>
              <CardDescription>Your personalized snapshot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {lastStart ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">Day {dayInCycle}</div>
                      <div className={cn("inline-flex items-center px-2 py-1 rounded-full text-xs font-medium", phase === "Period" && "bg-rose-100 text-rose-700", phase === "Follicular" && "bg-teal-100 text-teal-800", phase === "Ovulation" && "bg-violet-100 text-violet-800", phase === "Luteal" && "bg-amber-100 text-amber-800")}>{phase}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Next period</div>
                      <div className="font-medium">{nextStart ? format(nextStart, "MMM d") : "TBD"}</div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-rose-100/70 via-fuchsia-100/70 to-violet-100/70 p-4">
                    <div className="text-sm text-muted-foreground">Tip</div>
                    <div className="text-sm flex items-start gap-2"><Sparkles className="mt-0.5 size-4 text-rose-500" /> {phase === "Period" ? "Go gentle—hydration and warmth can help cramps." : phase === "Follicular" ? "Energy often rises here—walks or light workouts can feel great." : phase === "Ovulation" ? "Focus on protein and water today." : "Prioritize rest and steady snacks—your body is doing a lot."}</div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm">Set your last period start date to begin tracking.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Droplets className="text-rose-500" /> Quick log</CardTitle>
              <CardDescription>Track today's cramps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cramps" className="text-sm">Cramps intensity</Label>
                <div className="flex items-center gap-3">
                  <Slider id="cramps" min={0} max={3} step={1} value={[todayLog.cramps]} onValueChange={(v) => updateLog({ ...todayLog, cramps: v[0] ?? 0 })} className="max-w-xs" />
                  <div className="text-sm text-muted-foreground w-20">{["None","Mild","Moderate","Strong"][todayLog.cramps]}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Cycle length</Label>
                  <Input type="number" min={20} max={60} value={cycleLen} onChange={(e) => setSettings({ ...settings, cycleLength: Number(e.target.value || 0) })} />
                </div>
                <div>
                  <Label>Period days</Label>
                  <Input type="number" min={2} max={10} value={periodLen} onChange={(e) => setSettings({ ...settings, periodLength: Number(e.target.value || 0) })} />
                </div>
              </div>
              <Button onClick={() => updateLog(todayLog)} className="w-full">Save today</Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CalendarDays className="text-rose-500" /> Calendar</CardTitle>
              <CardDescription>Predicted periods & fertile window</CardDescription>
            </CardHeader>
            <CardContent>
              <DayPickerCalendar
                mode="single"
                selected={today}
                modifiers={calendarModifiers}
                modifiersClassNames={{
                  period: "bg-rose-200 text-rose-900 rounded-full",
                  fertile: "bg-teal-200 text-teal-900 rounded-full",
                  ovulation: "bg-violet-300 text-violet-900 rounded-full",
                  logged: "ring-2 ring-primary/60",
                }}
              />
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                <span className="inline-flex items-center gap-1"><span className="size-3 rounded-full bg-rose-300" /> Period</span>
                <span className="inline-flex items-center gap-1"><span className="size-3 rounded-full bg-violet-400" /> Ovulation</span>
                <span className="inline-flex items-center gap-1"><span className="size-3 rounded-full bg-teal-300" /> Fertile</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
