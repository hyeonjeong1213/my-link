"use client"

import { useState } from "react"
import { firebaseApp } from "@/lib/firebase"
import { getFirestore, collection, addDoc, Timestamp, doc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LinkItem } from "@/data/links"
import { Plus } from "lucide-react"

interface AddLinkDialogProps {
  onAdd: (link: LinkItem) => void
}

export function AddLinkDialog({ onAdd }: AddLinkDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [error, setError] = useState<{ title?: string; url?: string }>({})

  function validate() {
    const newError: { title?: string; url?: string } = {};
    // 제목: 비어 있지 않아야 하고 최대 30자
    if (!title.trim()) newError.title = "제목을 입력해주세요.";
    else if (title.trim().length > 30) newError.title = "제목은 30자를 넘을 수 없습니다.";
    // URL: 비어 있지 않아야 하고 http/https 프로토콜 확인
    if (!url.trim()) {
        newError.url = "URL을 입력해주세요.";
    } else {
        try {
            const parsed = new URL(url.trim());
            if (!/^https?:$/.test(parsed.protocol)) {
                newError.url = "URL은 http 또는 https 프로토콜이어야 합니다.";
            }
        } catch {
            newError.url = "올바른 URL 형식으로 입력해주세요. (예: https://example.com)";
        }
    }
    return newError;
}

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newError = validate();
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    try {
      const db = getFirestore(firebaseApp);
        const userDoc = doc(db, "user", "anonymous");
        const linksCol = collection(userDoc, "links");
        const docRef = await addDoc(linksCol, {
          title: title.trim(),
          url: url.trim(),
          createdAt: Timestamp.now(),
        });
      console.log("Document written with ID:", docRef.id);
    } catch (err) {
      console.error("Error adding document:", err);
    }

    handleClose();
  }

  function handleClose() {
    setOpen(false)
    setTitle("")
    setUrl("")
    setError({})
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true) }}>
      <DialogTrigger
        render={
          <Button
            variant="default"
            className="w-full max-w-sm rounded-xl border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 gap-2"
          />
        }
      >
        <Plus className="w-4 h-4" />
        링크 추가
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>새 링크 추가</DialogTitle>
          <DialogDescription>
            표시할 제목과 연결할 URL을 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-5 py-4">
            {/* 제목 필드 */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="link-title">제목</Label>
              <Input
                id="link-title"
                placeholder="예: 인스타그램"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (error.title) setError((prev) => ({ ...prev, title: undefined }))
                }}
                aria-invalid={!!error.title}
              />
              {error.title && (
                <p className="text-xs text-destructive">{error.title}</p>
              )}
            </div>

            {/* URL 필드 */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  if (error.url) setError((prev) => ({ ...prev, url: undefined }))
                }}
                aria-invalid={!!error.url}
              />
              {error.url && (
                <p className="text-xs text-destructive">{error.url}</p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <DialogClose render={<Button variant="outline" />}>
              취소
            </DialogClose>
            <Button type="submit">추가하기</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
