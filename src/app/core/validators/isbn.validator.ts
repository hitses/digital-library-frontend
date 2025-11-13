import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ISBN_PATTERN } from '../patterns';

/**
 * 1. Limpia y estandariza el ISBN eliminando prefijos y separadores.
 * @param isbn La cadena de ISBN original.
 * @returns La cadena de ISBN limpia (solo dígitos y 'X' en ISBN-10).
 */
export function cleanIsbn(isbn: string): string {
  return isbn
    .replace(/^(?:ISBN(?:-1[03])?:? )?/i, '') // Quitar prefijos
    .replace(/[-\s]/g, ''); // Quitar guiones y espacios
}

/**
 * 2. Valida la veracidad (checksum) de un ISBN limpio (10 o 13 dígitos).
 * @param cleanIsbn La cadena de ISBN limpia (solo dígitos/X).
 * @returns true si el ISBN pasa el chequeo de checksum, false en caso contrario.
 */
export function isIsbnChecksumValid(cleanIsbn: string): boolean {
  const len = cleanIsbn.length;

  if (len === 10) {
    // --- Lógica ISBN-10 (Módulo 11) ---
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanIsbn[i], 10) * (10 - i);
    }
    const checkDigit = cleanIsbn[9].toUpperCase() === 'X' ? 10 : parseInt(cleanIsbn[9], 10);
    sum += checkDigit;

    return sum % 11 === 0;
  } else if (len === 13) {
    // --- Lógica ISBN-13 (Módulo 10) ---
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const weight = i % 2 === 0 ? 1 : 3;
      sum += parseInt(cleanIsbn[i], 10) * weight;
    }
    const checkDigit = parseInt(cleanIsbn[12], 10);
    sum += checkDigit;

    return sum % 10 === 0;
  } else {
    return false;
  }
}

// --- ANGULAR VALIDATORS ---

/**
 * 3a. Validador de Angular para el FORMATO. Usa el RegExp pattern.
 * Comprueba la estructura de la cadena (longitud, separadores, prefijos).
 */
export function isbnFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (!value) {
      return null; // El validador 'required' debe manejar esto
    }

    if (ISBN_PATTERN.test(value)) {
      return null;
    }

    return { isbnFormat: { value: control.value, reason: 'Formato o estructura incorrecta.' } };
  };
}

/**
 * 3b. Validador de Angular para la VERACIDAD (Checksum).
 * DEBE USARSE DESPUÉS de isbnFormatValidator en Validators.compose.
 */
export function isbnChecksumValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (!value) {
      return null;
    }

    const clean = cleanIsbn(value);

    // Si el formato es correcto, se comprueba la veracidad (checksum)
    if (isIsbnChecksumValid(clean)) {
      return null;
    }

    return {
      isbnInvalid: {
        value: control.value,
        reason: 'El dígito de control (checksum) es incorrecto.',
      },
    };
  };
}

/**
 * 4. Validador COMPUESTO que comprueba FORMATO y CHECKSUM.
 * Este es el validador principal que se debe usar en el FormControl.
 */
export function isbnFullValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Primero, validar el FORMATO
    const formatError = isbnFormatValidator()(control);
    if (formatError) {
      return formatError; // Falla en formato -> devuelve error de formato
    }

    // Si el formato es OK, validar el CHECKSUM
    const checksumError = isbnChecksumValidator()(control);
    if (checksumError) {
      return checksumError; // Formato OK, Checksum KO -> devuelve error de checksum
    }

    // Si ambos son OK
    return null;
  };
}
