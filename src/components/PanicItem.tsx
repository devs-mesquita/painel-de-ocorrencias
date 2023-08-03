import { Panic } from "@/types/interfaces";

interface PanicItemProps {
  panic: Panic;
  handleSee: (id: number) => void;
}

export default function PanicItem({ panic, handleSee }: PanicItemProps) {
  const handleConfirm = (evt: React.MouseEvent<HTMLButtonElement>) => {
    handleSee(panic.id);
  };

  return (
    <div className="flex w-1/4 flex-col rounded p-4 shadow shadow-black/30">
      <div className="mb-4">
        <p>{panic.nome}</p>
        <p>Local: {panic.unidade}</p>
      </div>
      <button
        className="mx-auto rounded bg-slate-800 bg-gradient-to-br from-indigo-500/60 to-indigo-500/60 px-2 py-1 text-white shadow hover:from-indigo-600/50 hover:to-indigo-600/50"
        onClick={handleConfirm}
      >
        Confirmar
      </button>
    </div>
  );
}
