import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Bienvenido a la lista de Bodas de Ale e Isiaias!",
      verificationEmailBody: (createCode) =>
        `Use este código para verificar su cuenta: ${createCode()}`,
    },
  },
});
