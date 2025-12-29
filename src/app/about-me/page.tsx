const AboutMePage = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="mt-20 mb-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="rounded-xl border-dashed border-4 bg-card text-card-foreground p-8 hover:border-pink-500 transition-colors text-center w-[500px] min-h-[300px] flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">About Me</h1>

            <p className="text-stone-800 dark:text-stone-200 text-lg text-balance">
              Still under construction — like most good things in life
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
