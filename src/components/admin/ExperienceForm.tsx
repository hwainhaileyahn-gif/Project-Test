'use client'

import { useState } from 'react'

interface DefaultValues {
  company?: string
  role?: string
  startedAt?: string | null
  endedAt?: string | null
  sortOrder?: number
  descriptions?: string
}

interface Props {
  action: (formData: FormData) => Promise<void>
  defaultValues?: DefaultValues
}

export default function ExperienceForm({ action, defaultValues }: Props) {
  const [isCurrent, setIsCurrent] = useState(!defaultValues?.endedAt)

  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            회사명 <span className="text-red-400">*</span>
          </label>
          <input
            name="company"
            required
            defaultValue={defaultValues?.company}
            placeholder="예: 글로벌 전략컨설팅 A사"
            className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            직책/역할 <span className="text-red-400">*</span>
          </label>
          <input
            name="role"
            required
            defaultValue={defaultValues?.role}
            placeholder="예: 시니어 M&A 어드바이저"
            className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            입사일 <span className="text-red-400">*</span>
          </label>
          <input
            name="startedAt"
            type="date"
            required
            defaultValue={defaultValues?.startedAt ?? ''}
            className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">퇴사일</label>
          <input
            name="endedAt"
            type="date"
            defaultValue={defaultValues?.endedAt ?? ''}
            disabled={isCurrent}
            className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed"
          />
          <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
              className="w-4 h-4 rounded accent-accent"
            />
            <span className="text-xs text-neutral-500">현재 재직 중</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">업무 설명</label>
        <p className="text-xs text-neutral-400 mb-2">한 줄에 하나씩 입력 (각 줄이 항목 하나가 됩니다)</p>
        <textarea
          name="descriptions"
          rows={6}
          defaultValue={defaultValues?.descriptions}
          placeholder={'M&A 자문 및 기업 구조개편 전략 수립\nCross-border 딜 8건 리드'}
          className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-y"
        />
      </div>

      <div className="w-36">
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">정렬 순서</label>
        <input
          name="sortOrder"
          type="number"
          defaultValue={defaultValues?.sortOrder ?? 0}
          className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
        />
      </div>

      <div className="flex gap-3 pt-2 border-t border-neutral-100">
        <button
          type="submit"
          className="px-6 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors cursor-pointer"
        >
          저장
        </button>
        <a
          href="/"
          className="px-6 py-2.5 border border-neutral-200 text-neutral-600 rounded-xl text-sm font-medium hover:bg-neutral-50 transition-colors"
        >
          취소
        </a>
      </div>
    </form>
  )
}
