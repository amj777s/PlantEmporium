-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "show_number" INTEGER,
    "air_date" DATE,
    "round" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "highscores" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "created" DATE NOT NULL,

    CONSTRAINT "highscores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jeopardy_users" (
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "hash" TEXT NOT NULL,
    "created" DATE NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "starlight_highscores" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "score" INTEGER NOT NULL,
    "created" DATE NOT NULL,

    CONSTRAINT "starlight_highscores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "starlight_users" (
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "hash" TEXT NOT NULL,
    "created" DATE NOT NULL,

    CONSTRAINT "starlight_users_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_question_key" ON "game"("question");

-- AddForeignKey
ALTER TABLE "highscores" ADD CONSTRAINT "highscores_username_fkey" FOREIGN KEY ("username") REFERENCES "jeopardy_users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "starlight_highscores" ADD CONSTRAINT "starlight_highscores_username_fkey" FOREIGN KEY ("username") REFERENCES "starlight_users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;

