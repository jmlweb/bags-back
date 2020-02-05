function validateName(name: string): boolean {
  return /(^[A-Z])+([A-Za-z])\w+( )([   A-Za-z])+/.test(name)
}

export default validateName;
