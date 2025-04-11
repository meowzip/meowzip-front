'use server';

export async function sendDiscordErrorLog(message: string, context?: string) {
  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Discord Webhook URL 미설정');
    return;
  }

  const content = `🚨 ${context ? `URL: ${context}\n` : ''} ${message}`;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
  } catch (err) {
    console.error('Discord 전송 실패:', err);
  }
}
