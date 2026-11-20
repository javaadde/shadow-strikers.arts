import { describe, expect, it } from "vitest";
import { formatPhone, telLink, whatsappLink } from "./links";

describe("links", () => {
  it("builds a wa.me link with an encoded message", () => {
    expect(whatsappLink("919876543210", "Hi & hello")).toBe(
      "https://wa.me/919876543210?text=Hi%20%26%20hello"
    );
  });

  it("strips non-digits", () => {
    expect(whatsappLink("+91 98765-43210")).toBe("https://wa.me/919876543210");
    expect(telLink("91 98765 43210")).toBe("tel:+919876543210");
  });

  it("formats Indian numbers", () => {
    expect(formatPhone("919876543210")).toBe("+91 98765 43210");
    expect(formatPhone("4420123456")).toBe("+4420123456");
  });
});
