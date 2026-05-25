"use client"

import { useState } from "react"
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
    const newError: { title?: string; url?: string } = {}
    if (!title.trim()) newError.title = "제목을 입력해주세요."
    if (!url.trim()) {
      newError.url = "URL을 입력해주세요."
    } else {
      try {
        new URL(url.trim())
      } catch {
        newError.url = "올바른 URL 형식으로 입력해주세요. (예: https://example.com)"
      }
    }
    return newError
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newError = validate()
    if (Object.keys(newError).length > 0) {
      setError(newError)
      return
    }

    const newLink: LinkItem = {
      id: `link_${Date.now()}`,
      title: title.trim(),
      url: url.trim(),
      createdAt: new Date().toISOString(),
    }

    onAdd(newLink)
    handleClose()
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
            variant="outline"
            className="w-full max-w-sm rounded-xl border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200 gap-2"
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
