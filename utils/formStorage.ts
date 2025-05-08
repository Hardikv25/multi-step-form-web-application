export const getFormData = (category: string, formName: string, key = 'multiStepFormData') => {
    const raw = localStorage.getItem(key);
    const data = raw ? JSON.parse(raw) : {};
    return data?.[category]?.[formName] || null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setFormData = (category: string, formName: string, formData: any, key = 'multiStepFormData') => {
    const raw = localStorage.getItem(key);
    const existing = raw ? JSON.parse(raw) : {};
    if (!existing[category]) existing[category] = {};
    existing[category][formName] = formData;
    localStorage.setItem(key, JSON.stringify(existing));
};
