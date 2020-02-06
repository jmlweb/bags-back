function validateName(name: string): boolean {
  return /(^[A-Z])+([A-z\u00C0-\u00FF])+( )([   A-z\u00C0-\u00FF])+/.test(name);
}

export default validateName;
