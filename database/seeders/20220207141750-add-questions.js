"use strict";
const xlsx = require("xlsx");
module.exports = {
  async up(queryInterface, Sequelize) {
    var wb = xlsx.readFile("pytania.xlsx");
    var ws = wb.Sheets["Treść pytania"];
    var data = xlsx.utils.sheet_to_json(ws);
    var anwerIndex = 0;
    var questionArray = [];
    var anwearArray = [];
    var questionCategoryArray = [];
    var Kat = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      T: 5,
      AM: 6,
      A1: 7,
      A2: 8,
      B1: 9,
      C1: 10,
      D1: 11,
    };
    data.map((data) => {
      //pytanie
      var singleQuestion = {
        id: data["Numer pytania"],
        question: data["Pytanie"],
        points: parseInt(data["Liczba"]),
        type: data["Zakres struktury"],
      };
      if (data["Media"].replace(/\s/g, "") == "") singleQuestion.image = null;
      else singleQuestion.image = data["Media"];
      //dodwanie odpowiedzi
      if (data["Poprawna odp"] == "T" || data["Poprawna odp"] == "N") {
        // console.log(data["Numer pytania"], data["Poprawna odp"]);
        var odp = {
          T: {
            id: anwerIndex,
            content: "Tak",
            correct: false,
            questionId: data["Numer pytania"],
          },
          N: {
            id: ++anwerIndex,
            content: "Nie",
            correct: false,
            questionId: data["Numer pytania"],
          },
        };
        anwerIndex++;
        odp[data["Poprawna odp"]].correct = true;
        anwearArray.push(odp["T"]);
        anwearArray.push(odp["N"]);
      } else {
        var odp = {
          A: {
            id: anwerIndex,
            content: data["A"],
            correct: false,
            questionId: data["Numer pytania"],
          },
          B: {
            id: ++anwerIndex,
            content: data["B"],
            correct: false,
            questionId: data["Numer pytania"],
          },
          C: {
            id: ++anwerIndex,
            content: data["C"],
            correct: false,
            questionId: data["Numer pytania"],
          },
        };
        anwerIndex++;
        odp[data["Poprawna odp"]].correct = true;
        anwearArray.push(odp["A"]);
        anwearArray.push(odp["B"]);
        anwearArray.push(odp["C"]);
      }
      questionArray.push(singleQuestion);

      //pytania kategorie
      if (data["Kategorie"].includes(",")) {
        var kats = data["Kategorie"].split(",");
        kats.map((oneKat) => {
          var QC = {
            questionId: data["Numer pytania"],
            licenceCategoryId: Kat[oneKat],
          };
          questionCategoryArray.push(QC);
        });
      } else {
        var QC = {
          questionId: data["Numer pytania"],
          licenceCategoryId: Kat[data["Kategorie"]],
        };
        questionCategoryArray.push(QC);
      }
    });
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("questions", questionArray, {
        transaction,
      });
      await queryInterface.bulkInsert("answers", anwearArray, {
        transaction,
      });
      await queryInterface.bulkInsert(
        "category_questions",
        questionCategoryArray,
        {
          transaction,
        }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
