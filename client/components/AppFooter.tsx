export function AppFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>
          © {year} Aura Cycle · Gentle, minimalist period tracking with good
          vibes
        </p>
      </div>
    </footer>
  );
}
