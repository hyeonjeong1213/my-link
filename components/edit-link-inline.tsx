"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import { firebaseApp } from "@/lib/firebase";
import { getFirestore, doc, updateDoc, Timestamp } from "firebase/firestore";
import { LinkItem } from "@/data/links";

interface EditLinkInlineProps {
  link: LinkItem;
  onCancel: () => void;
  onSaved: () => void;
}

export function EditLinkInline({ link, onCancel, onSaved }: EditLinkInlineProps) {
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const newError: { title?: string; url?: string } = {};
    if (!title.trim()) newError.title = "제목을 입력해주세요.";
    else if (title.trim().length > 30) newError.title = "제목은 30자를 넘을 수 없습니다.";
    if (!url.trim()) newError.url = "URL을 입력해주세요.";
    else {
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
  };

  const handleSave = async () => {
    const newError = validate();
    if (Object.keys(newError).length > 0) {
      setErrors(newError);
      return;
    }
    setSaving(true);
    try {
      const db = getFirestore(firebaseApp);
      const linkDoc = doc(db, "user", "anonymous", "links", link.id);
      await updateDoc(linkDoc, {
        title: title.trim(),
        url: url.trim(),
        updatedAt: Timestamp.now(),
      });
      onSaved();
    } catch (err) {
      console.error("링크 수정 중 오류:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-card rounded-md">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="edit-title">
          제목
        </label>
        <Input
          id="edit-title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          aria-invalid={!!errors.title}
        />
        {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="edit-url">
          URL
        </label>
        <Input
          id="edit-url"
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (errors.url) setErrors((prev) => ({ ...prev, url: undefined }));
          }}
          aria-invalid={!!errors.url}
        />
        {errors.url && <p className="text-xs text-destructive">{errors.url}</p>}
      </div>
      <div className="flex gap-2 justify-end mt-2">
        <Button variant="outline" onClick={onCancel} disabled={saving}>
          취소
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "저장 중..." : "저장"}
        </Button>
      </div>
    </div>
  );
}
