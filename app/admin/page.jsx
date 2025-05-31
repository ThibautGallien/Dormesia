"use client";

export default function AdminPage() {
  // Redirection vers ton CMS admin
  if (typeof window !== "undefined") {
    window.location.href =
      "https://lesprosdecherbourg-admin.vercel.app/?site=dormesia";
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirection vers l'admin...</h1>
        <p>
          <a
            href="https://lesprosdecherbourg-admin.vercel.app/?site=dormesia"
            className="text-blue-600 hover:underline"
          >
            Cliquez ici si la redirection ne fonctionne pas
          </a>
        </p>
      </div>
    </div>
  );
}
