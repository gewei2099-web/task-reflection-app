require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const buildPrompt = (entry, goals) => {
  const systemPrompt = `你是一名行为心理分析师。
要求：
- 客观
- 不安慰
- 直接指出问题
- 结构清晰`

  const userPrompt = `用户今日反思记录如下：
${JSON.stringify(entry, null, 2)}

用户长期目标：
${JSON.stringify(goals, null, 2)}

请输出：
1. 核心行为模式分析
2. 是否存在拖延/自我欺骗
3. 与长期目标冲突点
4. 明日一个关键行动建议
5. 一句行为警醒语`

  return { systemPrompt, userPrompt }
}

app.post('/api/analyze', async (req, res) => {
  try {
    const { entry, goals } = req.body
    if (!entry) {
      return res.status(400).json({ error: '缺少 entry 参数' })
    }

    const { systemPrompt, userPrompt } = buildPrompt(entry, goals || {})

    const { data } = await axios.post(
      `${process.env.OPENAI_BASE_URL}/chat/completions`,
      {
        model: process.env.MODEL_NAME || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    )

    const analysis = data.choices?.[0]?.message?.content || ''
    res.json({ analysis })
  } catch (err) {
    console.error('Analyze error:', err.response?.data || err.message)
    res.status(500).json({
      error: err.response?.data?.error?.message || err.message || '分析请求失败'
    })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
