/**
 * Hook generic untuk section dengan toggle enable/disable (Story, Pray, dst).
 * @param {boolean} enabledFlag - nilai field toggle, mis. data.storyEnabled
 * @returns {boolean} true kalau section harus dirender
 */
 export function useToggleSection(enabledFlag) {
  return !!enabledFlag;
}