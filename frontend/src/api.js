import { getApiConfig } from './utils/storage'

function buildPrompt(entry, goals) {
  const systemPrompt = `你是一名行为心理分析师。
要求：
- 客观
- 不安慰
- 直接指出问题
- 结构清晰`

  const userPrompt = `用户今日反思记录如下：
${JSON.stringify(entry, null, 2)}

用户长期目标：
${JSON.stringify(goals || {}, null, 2)}

请输出：
1. 核心行为模式分析
2. 是否存在拖延/自我欺骗
3. 与长期目标冲突点
4. 明日一个关键行动建议
5. 一句行为警醒语`

  return { systemPrompt, userPrompt }
}

export async function analyze(data) {
  const { entry, goals } = data
  const config = getApiConfig()
  if (!config.apiKey || !config.baseUrl) {
    throw new Error('请先在「设置」中配置 API Key 和接口地址')
  }

  const { systemPrompt, userPrompt } = buildPrompt(entry, goals)
  const url = config.baseUrl.replace(/\/$/, '') + '/chat/completions'

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7
    })
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `请求失败: ${res.status}`)
  }

  const json = await res.json()
  const analysis = json.choices?.[0]?.message?.content || ''
  return { analysis }
}
