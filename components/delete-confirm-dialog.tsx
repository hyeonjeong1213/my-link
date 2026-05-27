"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmDialogProps {
  linkTitle: string;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function DeleteConfirmDialog({ linkTitle, open, onCancel, onConfirm, loading }: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onCancel(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p className="font-medium">{linkTitle}</p>
          <p className="mt-2 text-sm text-destructive">이 작업은 되돌릴 수 없습니다</p>
        </DialogDescription>
        <DialogFooter className="gap-2">
          <DialogClose>
            <Button variant="outline" onClick={onCancel} disabled={loading}>취소</Button>
          </DialogClose>
          <Button onClick={onConfirm} disabled={loading}>
            {loading ? "삭제 중..." : "삭제하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
