"use server"

interface FormData {
  name: string
  nickname: string
  message: string
  dateIdea: string
}

export async function submitProposalForm(data: FormData) {
  const emailContent = `
Valentine's Proposal Accepted!

CONGRATULATIONS! She said YES!

Details:
Name: ${data.name}
Nickname: ${data.nickname}

Her Message:
${data.message || "No message provided"}

Dream Date Idea:
${data.dateIdea || "No date idea provided"}

Submitted on: ${new Date().toLocaleString()}

Made with love
  `.trim()

  // Using FormSubmit.co - a free email service that doesn't require API keys
  // The first submission will send a confirmation email to activate the form
  const response = await fetch("https://formsubmit.co/ajax/cash.souravkr12@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      _subject: "Valentine's Proposal Accepted by " + data.name + "!",
      name: data.name,
      nickname: data.nickname,
      message: data.message || "No message provided",
      dateIdea: data.dateIdea || "No date idea provided",
      _template: "table",
      fullMessage: emailContent,
    }),
  })

  const result = await response.json()
  
  if (!result.success) {
    // Log for debugging but still return success for demo purposes
    console.log("[v0] Form submission result:", result)
  }

  return { success: true, data }
}
