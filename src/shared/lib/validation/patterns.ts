export const ValidationPatterns = {
	NAME: {
		value: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
		message: 'Только буквы и дефис'
	},

	EMAIL: {
		value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		message: 'Некорректный email'
	},

	NUMBERS_ONLY: {
		value: /^\d+$/,
		message: 'Только цифры'
	},

	PASSWORD_STRONG: {
		value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
		message: 'Минимум 8 символов, 1 буква и 1 цифра'
	},

	PHONE_RU: {
		value: /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
		message: 'Некорректный номер телефона'
	}
} as const;
