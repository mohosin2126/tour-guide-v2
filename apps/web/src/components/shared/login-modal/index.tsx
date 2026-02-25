import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { LogIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/use-auth";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message?: string;
}

export function LoginRequiredModal({ open, onOpenChange, message }: LoginModalProps) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm text-center">
        <DialogHeader className="items-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <LogIn className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-xl">Login Required</DialogTitle>
          <DialogDescription className="text-center">
            {message || "You need to be logged in to perform this action. Please log in or create an account to continue."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-col">
          <Button
            className="w-full"
            onClick={() => {
              onOpenChange(false);
              navigate("/auth/login", { state: { from: window.location.pathname } });
            }}
          >
            <LogIn size={16} className="mr-2" />
            Log In
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              onOpenChange(false);
              navigate("/auth/register");
            }}
          >
            Create Account
          </Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function useLoginGuard() {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>();

  const requireLogin = useCallback(
    (callback: () => void, message?: string) => {
      if (isAuthenticated) {
        callback();
      } else {
        setModalMessage(message);
        setShowModal(true);
      }
    },
    [isAuthenticated]
  );

  const LoginModal = (
    <LoginRequiredModal
      open={showModal}
      onOpenChange={setShowModal}
      message={modalMessage}
    />
  );

  return { requireLogin, LoginModal, showLoginModal: showModal };
}

export default LoginRequiredModal;
