<div className="bg-card rounded-2xl p-6 shadow-card mb-6">
  <h2 className="text-xl font-bold mb-6">{lesson.title}</h2>

  {lesson.content && lesson.content.trim().length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {lesson.content.split('\n').map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <div
              key={i}
              className="md:col-span-2 bg-secondary rounded-xl p-4 font-bold"
            >
              {line.replace(/\*\*/g, '')}
            </div>
          );
        }

        if (line.startsWith('- ')) {
          return (
            <div
              key={i}
              className="bg-muted rounded-xl p-4 text-sm"
            >
              {line.substring(2)}
            </div>
          );
        }

        if (line.trim().length === 0) return null;

        return (
          <div
            key={i}
            className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground"
          >
            {line}
          </div>
        );
      })}
    </div>
  ) : (
    <div className="bg-muted rounded-xl p-6 text-center text-muted-foreground">
      <p className="font-medium">Lesson content will appear here</p>
      <p className="text-sm mt-1">
        This lesson is being prepared with structured explanations.
      </p>
    </div>
  )}
</div>
