export type SendSMSProps = {
  to: string;
  text: string;
};

export async function sendSMS({ to, text }: SendSMSProps) {
  const sendSMS = await fetch("https://rest.nexmo.com/sms/json", {
    method: "POST",
    // headers: {
    //   'Content-Type': 'application',
    //   'Accept': 'application/json',
    // },
    body: new URLSearchParams({
      api_key: "3c8543ed",
      api_secret: "U1fqF2awiMyChAKW",
      to,
      from: "447520632426",
      text,
    }),
  });

  const parsed = await sendSMS.json();

  console.log("======");
  console.log("sendSMS::", parsed);
  console.log("======");

  return parsed;
}
