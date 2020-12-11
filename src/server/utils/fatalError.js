module.export = {
  fatal: (message) => {
    console.error(message);
    process.emit(1);
  },
};
