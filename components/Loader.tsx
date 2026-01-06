import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader flex items-center gap-3">
      <div className="relative flex h-8 w-8 items-center justify-center">
        <Image
          src="/assets/icons/loader.svg"
          alt="loader"
          width={32}
          height={32}
          className="animate-spin"
        />

        {/* subtle glow */}
        <span className="absolute h-full w-full rounded-full bg-black/5 blur-sm" />
      </div>

      <span className="text-sm font-medium text-gray-600">
        Loading
        <span className="inline-block animate-pulse">.</span>
        <span className="inline-block animate-pulse [animation-delay:0.15s]">
          .
        </span>
        <span className="inline-block animate-pulse [animation-delay:0.3s]">
          .
        </span>
      </span>
    </div>
  );
};

export default Loader;
