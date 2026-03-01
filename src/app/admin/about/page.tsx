"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AboutAdminRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.push("/admin/about/banner");
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground font-medium">Redirecting to About Banner...</p>
        </div>
    );
}
