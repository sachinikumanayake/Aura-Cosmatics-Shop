-- CreateTable
CREATE TABLE "Login" (
    "login_id" SERIAL NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(200) NOT NULL,

    CONSTRAINT "Login_pkey" PRIMARY KEY ("login_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Login_email_key" ON "Login"("email");
