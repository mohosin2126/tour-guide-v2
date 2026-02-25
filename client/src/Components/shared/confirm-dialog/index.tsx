import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, type LucideIcon } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: "default" | "destructive";
  icon?: LucideIcon;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  variant = "default",
  icon: Icon,
  loading = false,
}: ConfirmDialogProps) {
  const isDestructive = variant === "destructive";
  const DefaultIcon = isDestructive ? Trash2 : AlertTriangle;
  const DisplayIcon = Icon || DefaultIcon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader className="items-center text-center">
          <div
            className={`mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full ${
              isDestructive
                ? "bg-destructive/10"
                : "bg-amber-100 dark:bg-amber-900/30"
            }`}
          >
            <DisplayIcon
              className={`h-7 w-7 ${
                isDestructive
                  ? "text-destructive"
                  : "text-amber-600 dark:text-amber-400"
              }`}
            />
          </div>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex gap-2 sm:flex-row">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={isDestructive ? "destructive" : "default"}
            className="flex-1"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            disabled={loading}
          >
            {loading ? "Processing..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
