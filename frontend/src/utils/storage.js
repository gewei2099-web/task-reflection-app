const ENTRIES_KEY = 'reflection_entries'
const GOALS_KEY = 'long_term_goals'
const API_CONFIG_KEY = 'api_config'

export function getEntries() {
  try {
    const raw = localStorage.getItem(ENTRIES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveEntry(entry) {
  const entries = getEntries()
  const idx = entries.findIndex(e => e.id === entry.id)
  if (idx >= 0) {
    entries[idx] = entry
  } else {
    entries.unshift(entry)
  }
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries))
  return entries
}

export function deleteEntry(id) {
  const entries = getEntries().filter(e => e.id !== id)
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries))
  return entries
}

export function getEntryById(id) {
  return getEntries().find(e => e.id === id)
}

export function getGoals() {
  try {
    const raw = localStorage.getItem(GOALS_KEY)
    return raw ? JSON.parse(raw) : {
      vision: '',
      quarter_goal: '',
      month_focus: '',
      identity_statement: ''
    }
  } catch {
    return {
      vision: '',
      quarter_goal: '',
      month_focus: '',
      identity_statement: ''
    }
  }
}

export function saveGoals(goals) {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals))
  return goals
}

export function getApiConfig() {
  try {
    const raw = localStorage.getItem(API_CONFIG_KEY)
    return raw ? JSON.parse(raw) : {
      apiKey: '',
      baseUrl: 'https://api.openai.com/v1',
      model: 'gpt-4o-mini'
    }
  } catch {
    return { apiKey: '', baseUrl: 'https://api.openai.com/v1', model: 'gpt-4o-mini' }
  }
}

export function saveApiConfig(config) {
  localStorage.setItem(API_CONFIG_KEY, JSON.stringify(config))
  return config
}
