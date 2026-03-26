const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-dark-300">
      <div className="flex flex-col items-center gap-6">

        {/* Animated Logo / Pulse Ring */}
        <div className="relative flex items-center justify-center">
          {/* Outer ring */}
          <span
            className="absolute inline-flex h-20 w-20 rounded-full bg-green-500 opacity-20"
            style={{ animation: "ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite" }}
          />
          {/* Middle ring */}
          <span
            className="absolute inline-flex h-14 w-14 rounded-full bg-green-500 opacity-30"
            style={{ animation: "ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite 0.2s" }}
          />
          {/* Inner circle */}
          <span className="relative inline-flex h-8 w-8 rounded-full bg-green-500" />
        </div>

        {/* Animated dots */}
        <div className="flex items-center gap-2 mt-5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-green-500"
              style={{
                animation: "bounce 1s infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <p
          className="text-14-regular text-dark-600 tracking-widest uppercase"
          style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;