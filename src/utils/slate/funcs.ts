export const composeSlateHighOrderFns =
  (...fns) =>
  (arg) =>
    fns.reduceRight((acc, fn) => (fn ? fn(acc) : acc), arg);

export const clearEditor = (editor) => {
  const point = { path: [0, 0], offset: 0 };
  editor.selection = { anchor: point, focus: point };

  // For good measure, you can reset the history as well
  editor.history = { redos: [], undos: [] };
};
