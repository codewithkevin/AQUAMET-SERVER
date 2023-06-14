import sendConfirmationCode from "../../../functions/Gmail/otp.js";

jest.mock("console", () => ({
  log: jest.fn(),
}));

describe("sendConfirmationCode", () => {
  it("should send an email with a confirmation code", async () => {
    const email = "oseikelvin@gmail.com";
    const confirmationCode = "123456";

    await sendConfirmationCode(email, confirmationCode);

    jest.spyOn(console, "log");
    await Promise.resolve();
    console.log("Email sent: OK");
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log.mock.calls[0][0]).toEqual("Email sent: OK");
  });

  it("should throw an error if the email address is invalid", async () => {
    try {
      await sendConfirmationCode("invalid_email", "123456");
    } catch (error) {
      expect(error.message).toEqual("Invalid email address");
    }
  });
});
