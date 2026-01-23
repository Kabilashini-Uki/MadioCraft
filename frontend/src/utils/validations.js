// Validation utilities and schemas

/**
 * Email validation
 */
export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

/**
 * Password validation
 */
export const validatePassword = (password, options = {}) => {
  const { minLength = 6, requireUpperCase = true, requireNumber = true } = options;

  if (!password) {
    return 'Password is required';
  }

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  }

  if (requireUpperCase && !/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }

  if (requireNumber && !/\d/.test(password)) {
    return 'Password must contain at least one number';
  }

  return null;
};

/**
 * Name validation
 */
export const validateName = (name, fieldName = 'Name') => {
  if (!name) {
    return `${fieldName} is required`;
  }

  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }

  if (name.trim().length > 50) {
    return `${fieldName} must be less than 50 characters`;
  }

  // Check for valid name format (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name.trim())) {
    return `${fieldName} contains invalid characters`;
  }

  return null;
};

/**
 * Phone number validation (optional)
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return null; // Phone is optional
  }

  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number';
  }

  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return 'Phone number must be between 10 and 15 digits';
  }

  return null;
};

/**
 * URL validation
 */
export const validateURL = (url, fieldName = 'URL') => {
  if (!url) {
    return null; // URL is optional in most cases
  }

  try {
    new URL(url);
    return null;
  } catch {
    return `Please enter a valid ${fieldName}`;
  }
};

/**
 * Price validation
 */
export const validatePrice = (price, minPrice = 0) => {
  if (price === null || price === undefined || price === '') {
    return 'Price is required';
  }

  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numPrice)) {
    return 'Price must be a valid number';
  }

  if (numPrice < minPrice) {
    return `Price must be at least $${minPrice}`;
  }

  return null;
};

/**
 * Form validation helper - validates all fields and returns errors object
 */
export const validateForm = (values, schema) => {
  const errors = {};

  Object.keys(schema).forEach((field) => {
    const validators = schema[field];
    const value = values[field];

    if (Array.isArray(validators)) {
      for (const validator of validators) {
        const error = validator(value, values);
        if (error) {
          errors[field] = error;
          break; // Stop at first error for this field
        }
      }
    } else if (typeof validators === 'function') {
      const error = validators(value, values);
      if (error) {
        errors[field] = error;
      }
    }
  });

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

/**
 * Login form validation schema
 */
export const loginSchema = {
  email: [
    (value) => (!value ? 'Email is required' : null),
    validateEmail,
  ],
  password: [
    (value) => (!value ? 'Password is required' : null),
  ],
};

/**
 * Register form validation schema
 */
export const registerSchema = {
  name: [
    validateName,
  ],
  email: [
    (value) => (!value ? 'Email is required' : null),
    validateEmail,
  ],
  password: [
    validatePassword,
  ],
  confirmPassword: [
    (value, values) => {
      if (!value) {
        return 'Please confirm your password';
      }
      if (value !== values.password) {
        return 'Passwords do not match';
      }
      return null;
    },
  ],
};

/**
 * Debounce function for validation
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
