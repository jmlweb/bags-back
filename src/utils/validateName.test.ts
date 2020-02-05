import validateName from './validateName';

describe('validateName', () => {
  it('fails for a name with only 1 word', () => {
    expect(validateName('John')).toBe(false);
  });

  it('fails for a name which is not capitalized', () => {
    expect(validateName('john doe')).toBe(false);
  });

  it('works for a capitalized name with 2 words', () => {
    expect(validateName('John doe')).toBe(true);
  });
  it('works for a capitalized name with 3 words', () => {
    expect(validateName('John doe IsHere')).toBe(true);
  });
});
