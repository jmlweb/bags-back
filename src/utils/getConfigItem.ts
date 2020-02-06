function getConfigItem(key: string): string {
  const item = process.env[key];
  if (!item) {
    throw Error("The key passed doesn' exist on .env");
  }
  return item;
}

export default getConfigItem;
