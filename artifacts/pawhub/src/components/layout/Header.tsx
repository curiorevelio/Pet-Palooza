import { useGetSession } from "@workspace/api-client-react";
import { useAuth } from "@workspace/replit-auth-web";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PawPrint, User as UserIcon, LogOut } from "lucide-react";
import { Link } from "wouter";
import { SettingsDialog } from "./SettingsDialog";

export function Header() {
  const { data: session } = useGetSession();
  const { logout } = useAuth();

  if (!session) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-2xl font-serif">
          <PawPrint className="w-7 h-7" />
          <span>PawHub</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            {session.isProvider ? (
              <>
                <Link href="/provider" className="hover:text-primary transition-colors">Dashboard</Link>
                <Link href="/provider/bookings" className="hover:text-primary transition-colors">Bookings</Link>
                <Link href="/provider/services" className="hover:text-primary transition-colors">Services</Link>
                <Link href="/provider/availability" className="hover:text-primary transition-colors">Availability</Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                <Link href="/bookings" className="hover:text-primary transition-colors">Bookings</Link>
                <Link href="/pets" className="hover:text-primary transition-colors">Pets</Link>
                <Link href="/providers" className="hover:text-primary transition-colors">Find Care</Link>
              </>
            )}
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover-elevate ml-2">
                <Avatar className="h-10 w-10 border border-border shadow-sm">
                  <AvatarImage src={session.user.avatarUrl || ""} alt={session.user.displayName} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{session.user.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold leading-none">{session.user.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!session.isProvider && (
                <DropdownMenuItem asChild>
                  <Link href="/become-a-provider" className="cursor-pointer w-full flex items-center font-medium">
                    <PawPrint className="mr-2 h-4 w-4 text-primary" />
                    <span>Become a Provider</span>
                  </Link>
                </DropdownMenuItem>
              )}
              {session.isProvider && (
                <DropdownMenuItem asChild>
                  <Link href="/provider/profile" className="cursor-pointer w-full flex items-center font-medium">
                    <UserIcon className="mr-2 h-4 w-4 text-primary" />
                    <span>Provider Profile</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <div className="cursor-pointer w-full font-medium">
                  <SettingsDialog />
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => logout()}
                className="cursor-pointer font-medium text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
