import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int score = 0;

        System.out.println("=================================");
        System.out.println("   WELCOME TO THE JAVA QUIZ!     ");
        System.out.println("=================================\n");

        // Question 1
        System.out.println("1. What is the correct extension for Java files?");
        System.out.println("A) .js");
        System.out.println("B) .java");
        System.out.println("C) .py");
        System.out.print("Your answer: ");
        String answer1 = scanner.nextLine().trim().toUpperCase();

        if (answer1.equals("B")) {
            System.out.println("Correct!\n");
            score++;
        } else {
            System.out.println("Wrong! The correct answer is B.\n");
        }

        // Question 2
        System.out.println("2. Which keyword is used to create a class in Java?");
        System.out.println("A) class");
        System.out.println("B) define");
        System.out.println("C) struct");
        System.out.print("Your answer: ");
        String answer2 = scanner.nextLine().trim().toUpperCase();

        if (answer2.equals("A")) {
            System.out.println("Correct!\n");
            score++;
        } else {
            System.out.println("Wrong! The correct answer is A.\n");
        }

        // Question 3
        System.out.println("3. How do you print text to the console in Java?");
        System.out.println("A) Console.WriteLine()");
        System.out.println("B) print()");
        System.out.println("C) System.out.println()");
        System.out.print("Your answer: ");
        String answer3 = scanner.nextLine().trim().toUpperCase();

        if (answer3.equals("C")) {
            System.out.println("Correct!\n");
            score++;
        } else {
            System.out.println("Wrong! The correct answer is C.\n");
        }

        // Final Score
        System.out.println("=================================");
        System.out.println("Quiz Finished! Your total score: " + score + "/3");
        System.out.println("=================================");

        scanner.close();
    }
}