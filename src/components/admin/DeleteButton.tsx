'use client'

export default function DeleteButton({ action }: { action: () => Promise<void> }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm('정말 삭제하시겠습니까?')) e.preventDefault()
      }}
    >
      <button
        type="submit"
        className="text-xs px-2.5 py-1 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
      >
        삭제
      </button>
    </form>
  )
}
