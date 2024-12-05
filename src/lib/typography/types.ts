export type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'large' 
  | 'base' 
  | 'small' 
  | 'muted'
  | 'lead'

export type TextAlignment = 'left' | 'center' | 'right'

export interface TypographyContextValue {
  variant?: TextVariant
  align?: TextAlignment
}
