import React, { useState, useEffect, useRef } from 'react';
import { Play, Home, RotateCcw, Clock } from 'lucide-react';

const MathQuizApp = () => {
  // ONLY ACTUAL questions from your Excel file (verified correct - first 50)
  const allQuestions = [
    { Question: "What is the area of a right triangle with leg lengths of 6 and 8?", Answer: "24", Year: "03-04", Type: "MASTERS", Number: 1 },
    { Question: "What is the number of inches in 1 yard divided by 12?", Answer: "3", Year: "03-04", Type: "MASTERS", Number: 2 },
    { Question: "How many quarts are in 2 gallons?", Answer: "8", Year: "03-04", Type: "MASTERS", Number: 3 },
    { Question: "If Biff pushes a rock 5 feet up a 25-foot hill every day and every night Eho pushes it back 1 foot, how many days will it take Biff to get the rock to the top of the hill?", Answer: "6", Year: "03-04", Type: "MASTERS", Number: 4 },
    { Question: "If x equals 3 what is 3x plus 5?", Answer: "14", Year: "03-04", Type: "MASTERS", Number: 5 },
    { Question: "What is one-half plus one-fourth?", Answer: "3/4", Year: "03-04", Type: "MASTERS", Number: 6 },
    { Question: "What is the mean of the following set of data? (3,4,5,6,7,8,9)", Answer: "6", Year: "03-04", Type: "MASTERS", Number: 7 },
    { Question: "Kai has $3.50 in dimes. How many dimes does he have?", Answer: "35", Year: "03-04", Type: "MASTERS", Number: 8 },
    { Question: "What is the area of a circle with a diameter of 8 inches? Answer in terms of pi", Answer: "16pi", Year: "03-04", Type: "MASTERS", Number: 9 },
    { Question: "Solve for x: 2x + 7 = 19", Answer: "6", Year: "03-04", Type: "MASTERS", Number: 10 },
    { Question: "How many interior degrees are in a pentagon?", Answer: "540", Year: "03-04", Type: "MASTERS", Number: 11 },
    { Question: "What is the angle measure between the hour hand and the minute on an analog clock when it is 10:00 am?", Answer: "60", Year: "03-04", Type: "MASTERS", Number: 12 },
    { Question: "What is the product of 9 and 8 divided by 3?", Answer: "24", Year: "03-04", Type: "MASTERS", Number: 13 },
    { Question: "What is the difference between 291 and 152", Answer: "139", Year: "03-04", Type: "MASTERS", Number: 14 },
    { Question: "What is the sum of the first 7 positive whole numbers?", Answer: "28", Year: "03-04", Type: "MASTERS", Number: 15 },
    { Question: "What is 20% of 400?", Answer: "80", Year: "03-04", Type: "MASTERS", Number: 16 },
    { Question: "What is the area, in square inches, of a rectangle with height 3 inches and base 6 inches?", Answer: "18", Year: "03-04", Type: "CHAMPS", Number: 17 },
    { Question: "If Keisha types 40 words per minute, how many minutes would it take her to type an 800 word essay?", Answer: "20", Year: "03-04", Type: "CHAMPS", Number: 18 },
    { Question: "Paul is thinking of a number. If he subtracts 4 from this number, he gets 5. Which number is he thinking of?", Answer: "9", Year: "03-04", Type: "CHAMPS", Number: 19 },
    { Question: "What is the product of 5 and 12?", Answer: "60", Year: "03-04", Type: "CHAMPS", Number: 20 },
    { Question: "Shelby spends $2.50 on lunch every day. How much lunch money, in dollars, does she need for a regular 5 day school week?", Answer: "12.5", Year: "03-04", Type: "CHAMPS", Number: 21 },
    { Question: "What is the area of a right triangle with leg lengths of 4 and 9?", Answer: "18", Year: "03-04", Type: "CHAMPS", Number: 22 },
    { Question: "How much time, in minutes, passes between the time when Michelle arrives at school at 7:00 AM and when school starts at 8:25 AM?", Answer: "85", Year: "03-04", Type: "CHAMPS", Number: 23 },
    { Question: "If half my number is 40, what is twice my number?", Answer: "160", Year: "03-04", Type: "CHAMPS", Number: 24 },
    { Question: "If 100 days after the day before yesterday will be Tuesday, what day is today?", Answer: "Tuesday", Year: "03-04", Type: "CHAMPS", Number: 25 },
    { Question: "Find two times twice two, then double it.", Answer: "16", Year: "03-04", Type: "CHAMPS", Number: 26 },
    { Question: "What is the product of half of ten times half of zero?", Answer: "0", Year: "03-04", Type: "CHAMPS", Number: 27 },
    { Question: "What is the units digit of the product of 849 and 762?", Answer: "8", Year: "03-04", Type: "CHAMPS", Number: 28 },
    { Question: "If my number is two less than six squared, what is twice my number?", Answer: "68", Year: "03-04", Type: "CHAMPS", Number: 29 },
    { Question: "Name the largest counting number less than the sum of 19 and 17.", Answer: "35", Year: "03-04", Type: "CHAMPS", Number: 30 },
    { Question: "How much money, in dollars, would I have if I had 13 quarters?", Answer: "3.25", Year: "03-04", Type: "CHAMPS", Number: 31 },
    { Question: "How many hours is it from an hour before noon until an hour after midnight?", Answer: "14", Year: "03-04", Type: "CHAMPS", Number: 32 },
    { Question: "What is 9 times 12?", Answer: "108", Year: "04-05", Type: "CHAMPS", Number: 33 },
    { Question: "How many sides does an octagon have?", Answer: "8", Year: "04-05", Type: "CHAMPS", Number: 34 },
    { Question: "Evaluate the square root of 121.", Answer: "11", Year: "04-05", Type: "CHAMPS", Number: 35 },
    { Question: "What is the product of the first three prime numbers?", Answer: "30", Year: "04-05", Type: "CHAMPS", Number: 36 },
    { Question: "What is one-eighth of 32?", Answer: "4", Year: "04-05", Type: "CHAMPS", Number: 37 },
    { Question: "What is the perimeter of a square with area 49?", Answer: "28", Year: "04-05", Type: "CHAMPS", Number: 38 },
    { Question: "Evaluate: 3 cubed.", Answer: "27", Year: "04-05", Type: "CHAMPS", Number: 39 },
    { Question: "Divide 1024 by 8.", Answer: "128", Year: "04-05", Type: "CHAMPS", Number: 40 },
    { Question: "If **** has 130 dimes, how many dollars does he have?", Answer: "13", Year: "04-05", Type: "CHAMPS", Number: 41 },
    { Question: "What is 79 times the only even prime?", Answer: "158", Year: "04-05", Type: "CHAMPS", Number: 42 },
    { Question: "Compute 35 divided by 7.", Answer: "5", Year: "04-05", Type: "CHAMPS", Number: 43 },
    { Question: "What is the perimeter of a regular hexagon with side length 5?", Answer: "30", Year: "04-05", Type: "CHAMPS", Number: 44 },
    { Question: "What is the area of a square with side length 6?", Answer: "36", Year: "04-05", Type: "CHAMPS", Number: 45 },
    { Question: "Evaluate: 10 factorial divided by 8 factorial", Answer: "90", Year: "04-05", Type: "CHAMPS", Number: 46 },
    { Question: "What is two-fifths of 40?", Answer: "16", Year: "04-05", Type: "CHAMPS", Number: 47 },
    { Question: "What is the area of a right triangle with legs 5 and 12?", Answer: "30", Year: "04-05", Type: "CHAMPS", Number: 48 },
    { Question: "What is the difference between 321 and 189?", Answer: "132", Year: "04-05", Type: "MASTERS", Number: 49 },
    { Question: "What is the probability of getting a face card in a standard deck of cards?", Answer: "3/13", Year: "04-05", Type: "MASTERS", Number: 50 },
    { Question: "What is 13 squared?", Answer: "169", Year: "04-05", Type: "MASTERS", Number: 51 },
    { Question: "The area of a triangle is 18. The height and base are equal. What is the height?", Answer: "6", Year: "04-05", Type: "MASTERS", Number: 52 },
    { Question: "What is two-fifths of 30?", Answer: "12", Year: "04-05", Type: "MASTERS", Number: 53 },
    { Question: "Haley is 4 feet 10 inches tall. How tall is she in inches?", Answer: "58", Year: "04-05", Type: "MASTERS", Number: 54 },
    { Question: "What is three-fourths, expressed as a decimal?", Answer: "0.75", Year: "04-05", Type: "MASTERS", Number: 55 },
    { Question: "There are ducks and dogs in a field. There are 34 legs and 12 heads. How many dogs are there?", Answer: "5", Year: "04-05", Type: "MASTERS", Number: 56 },
    { Question: "What is 2/3 divided by 5/6?", Answer: "4/5", Year: "04-05", Type: "MASTERS", Number: 57 },
    { Question: "How many cups are in 3 ½ gallons?", Answer: "56", Year: "04-05", Type: "MASTERS", Number: 58 },
    { Question: "Suppose that A + B = 5, and 5 + B = 7. What is A?", Answer: "3", Year: "04-05", Type: "MASTERS", Number: 59 },
    { Question: "How many sides does a dodecagon have?", Answer: "12", Year: "04-05", Type: "MASTERS", Number: 60 },
    { Question: "What is the sum of 3578 and 333?", Answer: "3911", Year: "04-05", Type: "MASTERS", Number: 61 },
    { Question: "What time was it 32 minutes before 12:12 PM?", Answer: "0.486111111111111", Year: "04-05", Type: "MASTERS", Number: 62 },
    { Question: "How many feet are in a mile?", Answer: "5280", Year: "04-05", Type: "MASTERS", Number: 63 },
    { Question: "I am thinking of a number divisible by 5. It is a prime number. What is my number?", Answer: "5", Year: "04-05", Type: "MASTERS", Number: 64 },
    { Question: "What is 8 times 70?", Answer: "560", Year: "05-06", Type: "CHAMPS", Number: 65 },
    { Question: "How many sides does a dodecagon have?", Answer: "12", Year: "05-06", Type: "CHAMPS", Number: 66 },
    { Question: "What is .75 as a reduced fraction?", Answer: "0.75", Year: "05-06", Type: "CHAMPS", Number: 67 },
    { Question: "The sum of three consecutive even whole numbers is 30. What is the largest of the three numbers?", Answer: "12", Year: "05-06", Type: "CHAMPS", Number: 68 },
    { Question: "Find the sum of 83 and 39.", Answer: "122", Year: "05-06", Type: "CHAMPS", Number: 69 },
    { Question: "What is the area of a rectangle whose length is 8 and whose width is 4?", Answer: "32", Year: "05-06", Type: "CHAMPS", Number: 70 },
    { Question: "Math is Cool Championships starts at 3:30 pm. If you were 12 minutes early, when did you arrive?", Answer: "3:18 PM", Year: "05-06", Type: "CHAMPS", Number: 71 },
    { Question: "Max's recreation store makes bicycles and tricycles. If Max has 53 wheels, what is the largest number of tricycles he can make?", Answer: "17", Year: "05-06", Type: "CHAMPS", Number: 72 },
    { Question: "What is the difference between 72 and 38?", Answer: "34", Year: "05-06", Type: "CHAMPS", Number: 73 },
    { Question: "Find the perimeter of a square with a side of length 8.5.", Answer: "34", Year: "05-06", Type: "CHAMPS", Number: 74 },
    { Question: "Evaluate 9 times 9 plus 9.", Answer: "90", Year: "05-06", Type: "CHAMPS", Number: 75 },
    { Question: "If each of the 26 letters of the alphabet is assigned a number, starting with A=1, B=2, and so on until Z=26, what would be the sum of the letters in the word baby?", Answer: "30", Year: "05-06", Type: "CHAMPS", Number: 76 },
    { Question: "What is the quotient of 75 and 3?", Answer: "25", Year: "05-06", Type: "CHAMPS", Number: 77 },
    { Question: "What is one half plus one fifth?", Answer: "0.7", Year: "05-06", Type: "CHAMPS", Number: 78 },
    { Question: "How many inches are there in three and a half feet?", Answer: "42", Year: "05-06", Type: "CHAMPS", Number: 79 },
    { Question: "35 is 50% of what number?", Answer: "70", Year: "05-06", Type: "CHAMPS", Number: 80 },
    { Question: "What is 51 divided by 51?", Answer: "1", Year: "06-07", Type: "CHAMPS", Number: 81 },
    { Question: "What is the number of degrees in the sum of the angles of a rectangle?", Answer: "360", Year: "06-07", Type: "CHAMPS", Number: 82 },
    { Question: "What is 12 minus 7 plus 6 minus 5 plus 1?", Answer: "7", Year: "06-07", Type: "CHAMPS", Number: 83 },
    { Question: "Find the number of square inches in the area of a square with side length 9 inches.", Answer: "81", Year: "06-07", Type: "CHAMPS", Number: 84 },
    { Question: "How many degrees does the minute hand of a clock travel in one hour?", Answer: "360", Year: "06-07", Type: "CHAMPS", Number: 85 },
    { Question: "What is the product of 2, 7, and 3?", Answer: "42", Year: "06-07", Type: "CHAMPS", Number: 86 },
    { Question: "How many seconds have elapsed between 1:20 PM and 1:24 PM?", Answer: "240", Year: "06-07", Type: "CHAMPS", Number: 87 },
    { Question: "What is the largest remainder possible when you divide a positive whole number by 8?", Answer: "7", Year: "06-07", Type: "CHAMPS", Number: 88 },
    { Question: "Find the sum of 45 and 17.", Answer: "62", Year: "06-07", Type: "CHAMPS", Number: 89 },
    { Question: "What is one-fourth of 88?", Answer: "22", Year: "06-07", Type: "CHAMPS", Number: 90 },
    { Question: "How many eggs are in 6 dozen eggs?", Answer: "72", Year: "06-07", Type: "CHAMPS", Number: 91 },
    { Question: "What is five thousand five hundred fifty-five minus four thousand four hundred forty-four?", Answer: "1111", Year: "06-07", Type: "CHAMPS", Number: 92 },
    { Question: "What is 24 divided by the product of 2 and 4?", Answer: "3", Year: "06-07", Type: "CHAMPS", Number: 93 },
    { Question: "How many centimeters are in a meter?", Answer: "100", Year: "06-07", Type: "CHAMPS", Number: 94 },
    { Question: "What is 11 times 11?", Answer: "121", Year: "06-07", Type: "CHAMPS", Number: 95 },
    { Question: "Find the sum of fifty thousand plus five thousand five hundred plus fifty-five.", Answer: "55555", Year: "06-07", Type: "CHAMPS", Number: 96 },
    { Question: "What is the sum of 67 and 48?", Answer: "115", Year: "06-07", Type: "MASTERS", Number: 97 },
    { Question: "What is the product of 6 and 13?", Answer: "78", Year: "06-07", Type: "MASTERS", Number: 98 },
    { Question: "Jim needs 1000 signatures to get a ballot passed. Jim has 654 signatures, how many more does he need?", Answer: "346", Year: "06-07", Type: "MASTERS", Number: 99 },
    { Question: "The number of boys in Triscia's class exceeded the number of girls by 7. If there were a total of 29 pupils in her class, how many were boys?", Answer: "18", Year: "06-07", Type: "MASTERS", Number: 100 },
    { Question: "What is 9 squared?", Answer: "81", Year: "06-07", Type: "MASTERS", Number: 101 },
    { Question: "What is the positive square root of 121?", Answer: "11", Year: "06-07", Type: "MASTERS", Number: 102 },
    { Question: "How many minutes have passed between 11 o'clock am and 1:17pm?", Answer: "137", Year: "06-07", Type: "MASTERS", Number: 103 },
    { Question: "Joe made 60% more points at his basketball game this time than he did at his last basketball game. If he made 32 points this game, how many points did he make at the last game?", Answer: "20", Year: "06-07", Type: "MASTERS", Number: 104 },
    { Question: "How many sides does a decagon have?", Answer: "10", Year: "06-07", Type: "MASTERS", Number: 105 },
    { Question: "Jill made 8 dozen brownies. How many brownies did she make?", Answer: "96", Year: "06-07", Type: "MASTERS", Number: 106 },
    { Question: "108 doughnuts are put into boxes with a dozen in each box. How many boxes are needed to hold the doughnuts?", Answer: "9", Year: "06-07", Type: "MASTERS", Number: 107 },
    { Question: "The average of the first 7 numbers was 21. The average of the next 3 numbers was only 11. What was the over all average of the all the numbers?", Answer: "18", Year: "06-07", Type: "MASTERS", Number: 108 },
    { Question: "What is the area, in square units, of a square whose perimeter is 12?", Answer: "9", Year: "06-07", Type: "MASTERS", Number: 109 },
    { Question: "What time is it 24 minutes before 7:18 pm?", Answer: "6:54 PM", Year: "06-07", Type: "MASTERS", Number: 110 },
    { Question: "A hole of Frisbee golf takes ten minutes to complete. How many hours will it take to complete eighteen holes of Frisbee golf?", Answer: "3", Year: "06-07", Type: "MASTERS", Number: 111 },
    { Question: "Parking fees in Mathville are calculated on a weighted value. The first hour is weighted at 5 times the cost of each of the other hours following. What is the charge, in dollars, for 6 hours of parking if the second hour cost $1?", Answer: "10", Year: "06-07", Type: "MASTERS", Number: 112 },
    { Question: "Add the following fractions and simplify your answer: one-sixth plus three-sixths.", Answer: "0.666666666666667", Year: "07-08", Type: "CHAMPS", Number: 113 },
    { Question: "How many sides does a quadrilateral have?", Answer: "4", Year: "07-08", Type: "CHAMPS", Number: 114 },
    { Question: "What is the largest whole number that divides into both twelve and twenty-four with no remainder?", Answer: "12", Year: "07-08", Type: "CHAMPS", Number: 115 },
    { Question: "What time is it one hundred minutes after seven ten PM?", Answer: "8:50 PM", Year: "07-08", Type: "CHAMPS", Number: 116 },
    { Question: "How many positive whole numbers divide into 29 with no remainder?", Answer: "2", Year: "07-08", Type: "CHAMPS", Number: 117 },
    { Question: "If Miya and Helen together can write two mental math questions in ten minutes, how many mental math questions can they write in three hours?", Answer: "36", Year: "07-08", Type: "CHAMPS", Number: 118 },
    { Question: "Harold has three nickels and 2 dimes in his pocket. How many coins must he take out to guarantee that he gets at least fifteen cents?", Answer: "3", Year: "07-08", Type: "CHAMPS", Number: 119 },
    { Question: "What is the sum when you add 22 to half of 22?", Answer: "33", Year: "07-08", Type: "CHAMPS", Number: 120 },
    { Question: "How many days are in two weeks and three days?", Answer: "17", Year: "07-08", Type: "CHAMPS", Number: 121 },
    { Question: "What is the remainder when 58 is divided by 5?", Answer: "3", Year: "07-08", Type: "CHAMPS", Number: 122 },
    { Question: "Find the perimeter of a rectangle, given that the area is twenty-eight square units and one side length is seven units.", Answer: "22", Year: "07-08", Type: "CHAMPS", Number: 123 },
    { Question: "Charlie is making cookies. He will make either chewy or crunchy cookies, and he will use either chocolate chips or nuts, or maybe both. How many types of cookies can Charlie make?", Answer: "6", Year: "07-08", Type: "CHAMPS", Number: 124 },
    { Question: "If twice my number is equal to sixteen, what is half of my number?", Answer: "4", Year: "07-08", Type: "CHAMPS", Number: 125 },
    { Question: "What is the sum in degrees of the interior angles of a square?", Answer: "360", Year: "07-08", Type: "CHAMPS", Number: 126 },
    { Question: "What is the probability of drawing an ace from a standard fifty-two-card deck in one random draw? Give your answer as a simplified fraction.", Answer: "1/13", Year: "07-08", Type: "CHAMPS", Number: 127 },
    { Question: "Cam licks a lollipop at a rate of fifteen licks a minute. If he finishes the lollipop with 75 licks, how many minutes does it take him to finish?", Answer: "5", Year: "07-08", Type: "CHAMPS", Number: 128 },
    { Question: "Identify the median of the following set of numbers: seven, three, nine, four, and ten.", Answer: "7", Year: "07-08", Type: "MASTERS", Number: 129 },
    { Question: "If Andrew rides a bike at ten miles per hour, how many hours of riding would it take him to go 470 miles?", Answer: "47", Year: "07-08", Type: "MASTERS", Number: 130 },
    { Question: "A square has an area of 16 square centimeters. Each side length of this square is doubled to form a new square. What is the area of the new square, in square centimeters?", Answer: "64", Year: "07-08", Type: "MASTERS", Number: 131 },
    { Question: "What is the remainder when sixty-eight is divided by eleven?", Answer: "2", Year: "07-08", Type: "MASTERS", Number: 132 },
    { Question: "If two-thirds of my number is equal to twelve, what is my number?", Answer: "18", Year: "07-08", Type: "MASTERS", Number: 133 },
    { Question: "Ten people like ice cream. Five of these people like chocolate ice cream, while eight of them like vanilla ice cream. How many of these people like both vanilla and chocolate ice cream?", Answer: "3", Year: "07-08", Type: "MASTERS", Number: 134 },
    { Question: "Two angles of a triangle are fifty degrees and sixty degrees. What is the degree measure of the third angle?", Answer: "70", Year: "07-08", Type: "MASTERS", Number: 135 },
    { Question: "Evaluate: two thousand four hundred minus one hundred thirty.", Answer: "2270", Year: "07-08", Type: "MASTERS", Number: 136 },
    { Question: "Find the combined area, in square meters, of one square with side lengths of five meters and another square with side lengths of six meters.", Answer: "61", Year: "07-08", Type: "MASTERS", Number: 137 },
    { Question: "Evaluate: seventy-two minus twenty-three.", Answer: "49", Year: "07-08", Type: "MASTERS", Number: 138 },
    { Question: "If I roll two standard dice, what is the probability that both of them will show an odd number? Give your answer as a fraction.", Answer: "1/4", Year: "07-08", Type: "MASTERS", Number: 139 },
    { Question: "What time was it three hours ago if it is now one minute before 2 PM?", Answer: "10:59 AM", Year: "07-08", Type: "MASTERS", Number: 140 },
    { Question: "Find the area in square meters of a rectangle with length twelve meters and width eleven meters.", Answer: "132", Year: "07-08", Type: "MASTERS", Number: 141 },
    { Question: "Trevor has a round cheesecake cut into sixteen equal slices. Four slices have blueberry sauce, four have chocolate sauce, and the rest are plain. If Trevor chooses one slice at random, what is the probability that he will choose a slice with blueberry sauce?", Answer: "1/4", Year: "07-08", Type: "MASTERS", Number: 142 },
    { Question: "Find the total length in inches of three inches plus one foot plus half a foot.", Answer: "21", Year: "07-08", Type: "MASTERS", Number: 143 },
    { Question: "If three chickens and three cows are in a field, what is the average number of legs per animal in the field?", Answer: "3", Year: "07-08", Type: "MASTERS", Number: 144 },
    { Question: "What is the difference between fifty-four and twenty-seven?", Answer: "27", Year: "08-09", Type: "CHAMPS", Number: 145 },
    { Question: "If it takes Helen and Miya six minutes to write a math question, how minutes will it take them to write four sets of four questions?", Answer: "96", Year: "08-09", Type: "CHAMPS", Number: 146 },
    { Question: "Paul leaves his house to go running, and Paul can run a mile in eight minutes. If he runs four miles and takes a ten minute break, how long, in minutes, was he out?", Answer: "42", Year: "08-09", Type: "CHAMPS", Number: 147 },
    { Question: "What is the product of twelve and nine?", Answer: "108", Year: "08-09", Type: "CHAMPS", Number: 148 },
    { Question: "Tom and Andrew decide to share their candy equally. Tom has sixty pieces and Andrew has twenty-four pieces, how many pieces will each person get?", Answer: "42", Year: "08-09", Type: "CHAMPS", Number: 149 },
    { Question: "How many positive factors does the number fifteen have?", Answer: "4", Year: "08-09", Type: "CHAMPS", Number: 150 },
    { Question: "If it is six fifteen in the morning right now, what time will it be in two hours and twenty minutes?", Answer: "8:35 AM", Year: "08-09", Type: "CHAMPS", Number: 151 },
    { Question: "What is the sum of one-fourth and one-half?", Answer: "3/4", Year: "08-09", Type: "CHAMPS", Number: 152 },
    { Question: "What is the third smallest two-digit odd number?", Answer: "15", Year: "08-09", Type: "CHAMPS", Number: 153 },
    { Question: "What is the perimeter of a regular dodecagon with a side length of three?", Answer: "36", Year: "08-09", Type: "CHAMPS", Number: 154 },
    { Question: "How much money is two quarters, four dimes, and 3 nickels? Express your answer in cents.", Answer: "105", Year: "08-09", Type: "CHAMPS", Number: 155 },
    { Question: "Fred has four red socks and eight blue socks. Blue socks are what fraction of his socks?", Answer: "2/3", Year: "08-09", Type: "CHAMPS", Number: 156 },
    { Question: "Five cows are grazing in a pasture, how many legs are there?", Answer: "20", Year: "08-09", Type: "CHAMPS", Number: 157 },
    { Question: "Alison drinks a quart of water a day. How many days will it take her to drink three gallons?", Answer: "12", Year: "08-09", Type: "CHAMPS", Number: 158 },
    { Question: "What is the sum of the interior angles of a pentagon, in degrees?", Answer: "540", Year: "08-09", Type: "CHAMPS", Number: 159 },
    { Question: "If a mathlete answers seventy-five percent of her math questions correctly and she is given four questions, how many will she get correct?", Answer: "3", Year: "08-09", Type: "CHAMPS", Number: 160 },
    { Question: "When counting backwards from 100 by 13s, the first number I say is 100. What is the next even number I will say?", Answer: "74", Year: "08-09", Type: "MASTERS", Number: 161 },
    { Question: "What is the area, in square meters, of a square that is just large enough to enclose a circle of radius 10 meters?", Answer: "400", Year: "08-09", Type: "MASTERS", Number: 162 },
    { Question: "What is one-half plus one-third? Express your answer as a reduced fraction.", Answer: "5/6", Year: "08-09", Type: "MASTERS", Number: 163 },
    { Question: "How many ways can I arrange the letters in the word mental, spelled M-E-N-T-A-L, if the L must come first?", Answer: "120", Year: "08-09", Type: "MASTERS", Number: 164 },
    { Question: "Wendy has 8 boxes with 5 bags in each box. Each of the bags holds the same number of pearls. If Wendy has a total of 120 pearls in all her boxes, how many pearls are in each bag?", Answer: "3", Year: "08-09", Type: "MASTERS", Number: 165 },
    { Question: "How many meters are in two point three one kilometers?", Answer: "2310", Year: "08-09", Type: "MASTERS", Number: 166 },
    { Question: "What is the difference in inches between the perimeter of a regular pentagon with sides of length 10 inches and the perimeter of a regular triangle with sides of length 7 inches?", Answer: "29", Year: "08-09", Type: "MASTERS", Number: 167 },
    { Question: "What number must I subtract from the product of 4 and 17 to get an answer equal to the sum of 4 and 17?", Answer: "47", Year: "08-09", Type: "MASTERS", Number: 168 },
    { Question: "A shelf in my kitchen has 3 spotted cups, 5 striped cups, and 1 checkered cup. If I select a cup at random, what is the probability that it will be spotted? Give your answer as a reduced fraction.", Answer: "1/3", Year: "08-09", Type: "MASTERS", Number: 169 },
    { Question: "If fifty-three plus X is equal to seventy, then what is seventy plus X?", Answer: "87", Year: "08-09", Type: "MASTERS", Number: 170 },
    { Question: "My number has two digits. If the sum of these two digits is less than 10, what is the largest my number can be?", Answer: "90", Year: "08-09", Type: "MASTERS", Number: 171 },
    { Question: "How many seconds have elapsed from 8:15 AM to 9:20 AM the same day?", Answer: "3900", Year: "08-09", Type: "MASTERS", Number: 172 },
    { Question: "Evaluate: twenty point four plus thirty point five plus ten point two. If your answer is not a whole number, give it as a decimal.", Answer: "61.1", Year: "08-09", Type: "MASTERS", Number: 173 },
    { Question: "The day after tomorrow is a Sunday. What day of the week will it be twelve days after today?", Answer: "Wednesday", Year: "08-09", Type: "MASTERS", Number: 174 },
    { Question: "Find the sum of nine, eighteen, and twenty-seven.", Answer: "54", Year: "08-09", Type: "MASTERS", Number: 175 },
    { Question: "What is the remainder when two-hundred seventy-one is divided by 3?", Answer: "1", Year: "08-09", Type: "MASTERS", Number: 176 },
    { Question: "What is the product of 4 and 8?", Answer: "32", Year: "09-10", Type: "CHAMPS", Number: 177 },
    { Question: "What is the area of a square with side length of 8?", Answer: "64", Year: "09-10", Type: "CHAMPS", Number: 178 },
    { Question: "How many odd numbers are there between 20 and 30?", Answer: "5", Year: "09-10", Type: "CHAMPS", Number: 179 },
    { Question: "The difference between two numbers is eleven. The smallest number is 9. What is the largest number?", Answer: "20", Year: "09-10", Type: "CHAMPS", Number: 180 },
    { Question: "What is one-third of 45?", Answer: "15", Year: "09-10", Type: "CHAMPS", Number: 181 },
    { Question: "What is the area of a triangle with base 5 and height 8?", Answer: "20", Year: "09-10", Type: "CHAMPS", Number: 182 },
    { Question: "Brandon gets 5 out of 7 problems correct at math contests. There are 84 problems in the contest for which he is competing. How many problems will he get correct?", Answer: "60", Year: "09-10", Type: "CHAMPS", Number: 183 },
    { Question: "Two squares of side length 4 cm share a side to form a rectangle. What is the perimeter of the rectangle, in cm?", Answer: "24", Year: "09-10", Type: "CHAMPS", Number: 184 },
    { Question: "What is the difference between 28 and 16?", Answer: "12", Year: "09-10", Type: "CHAMPS", Number: 185 },
    { Question: "The perimeter of a regular pentagon is 35 inches. What is the length, in inches, of one side of a pentagon?", Answer: "7", Year: "09-10", Type: "CHAMPS", Number: 186 },
    { Question: "Shay has $30. Carnival rides are $4 a ride or $8 for 3 rides. What is the greatest number of rides she purchase for $30?", Answer: "10", Year: "09-10", Type: "CHAMPS", Number: 187 },
    { Question: "Each of 5 kids are the exact same height of 48 inches. When one stands on the shoulder of another to form a human tower, the total height is 90 inches. If all 5 kids stand on each others shoulders to make a very tall tower, what is the total height of the human tower in inches?", Answer: "216", Year: "09-10", Type: "CHAMPS", Number: 188 },
    { Question: "What is the sum of the four numbers one, eleven, one-hundred eleven and one thousand one-hundred eleven?", Answer: "1234", Year: "09-10", Type: "CHAMPS", Number: 189 },
    { Question: "How many minutes have elapsed between 11:00 a.m. and 1:30 p.m.?", Answer: "150", Year: "09-10", Type: "CHAMPS", Number: 190 },
    { Question: "The ratio of girls to boys on the math team is 3 to 4. If there are 9 girls on the team, how many boys are on the team?", Answer: "12", Year: "09-10", Type: "CHAMPS", Number: 191 },
    { Question: "If 5 widgets equal 3 snarflaks and 2 snarflaks equal 3 gizmos, then 27 gizmos equal how many widgets?", Answer: "30", Year: "09-10", Type: "CHAMPS", Number: 192 },
    { Question: "Find the sum of the numerator and denominator of the reduced fraction that is equal to ten over fifteen.", Answer: "5", Year: "09-10", Type: "MASTERS", Number: 193 },
    { Question: "In how many orders can I arrange a penny, a nickel, and a dime in a row?", Answer: "6", Year: "09-10", Type: "MASTERS", Number: 194 },
    { Question: "I go to a pet store with twenty-two dollars. Turtles cost four dollars and fifty cents each. What is the maximum number of whole turtles I can buy?", Answer: "4", Year: "09-10", Type: "MASTERS", Number: 195 },
    { Question: "The sum of two prime numbers is twelve. What is the smaller of the two prime numbers?", Answer: "5", Year: "09-10", Type: "MASTERS", Number: 196 },
    { Question: "All my cooking pots are the same size. If one pot can hold two quarts of soup, how many pots will I need to hold fourteen quarts of soup?", Answer: "7", Year: "09-10", Type: "MASTERS", Number: 197 },
    { Question: "Find the total number of ounces in two pounds and nine ounces.", Answer: "41", Year: "09-10", Type: "MASTERS", Number: 198 },
    { Question: "One acute angle of a right triangle measures seventy-four degrees. Find the degree measure of the smallest angle of this triangle.", Answer: "16", Year: "09-10", Type: "MASTERS", Number: 199 },
    { Question: "What is three-fourths of six hundred?", Answer: "450", Year: "09-10", Type: "MASTERS", Number: 200 },
    { Question: "The area of a rectangle is twelve square units. If both length and width are EVEN whole numbers, what is the number of units in the longest side of this rectangle?", Answer: "6", Year: "09-10", Type: "MASTERS", Number: 201 },
    { Question: "Find the sum of the five smallest counting numbers that are all multiples of five.", Answer: "75", Year: "09-10", Type: "MASTERS", Number: 202 },
    { Question: "What is the units or one's place digit of the product of seventy-nine times eighty-four?", Answer: "6", Year: "09-10", Type: "MASTERS", Number: 203 },
    { Question: "The sum of two consecutive whole numbers is one hundred twenty-three. What is the smaller of these two numbers?", Answer: "61", Year: "09-10", Type: "MASTERS", Number: 204 },
    { Question: "How many sides of an equilateral triangle are the same length?", Answer: "3", Year: "09-10", Type: "MASTERS", Number: 205 },
    { Question: "The product of seven counting numbers is eighteen. What is the largest possible sum of these seven numbers?", Answer: "24", Year: "09-10", Type: "MASTERS", Number: 206 },
    { Question: "What fraction of the months of a calendar year, have thirty-one days?", Answer: "7/12", Year: "09-10", Type: "MASTERS", Number: 207 },
    { Question: "On a certain day last winter, the temperature was twenty degrees at 8 AM. When I checked at 10 AM, the temperature had fallen by thirty degrees. At noon, the temperature was fifteen degrees higher than at 10 AM. What was the number of degrees in the temperature at noon that day?", Answer: "5", Year: "09-10", Type: "MASTERS", Number: 208 },
    { Question: "What is the perimeter of a rectangle with two sides of length 4 and 13?", Answer: "34", Year: "10-11", Type: "CHAMPS", Number: 209 },
    { Question: "How many prime numbers are there less than 25?", Answer: "9", Year: "10-11", Type: "CHAMPS", Number: 210 },
    { Question: "What is the median of the counting numbers from 10 through 20, inclusive?", Answer: "15", Year: "10-11", Type: "CHAMPS", Number: 211 },
    { Question: "There were twenty-three students in the classroom. Counting Mrs. Johnson, the teacher, there are twice as many females in the classroom as males. How many boys are in the class?", Answer: "8", Year: "10-11", Type: "CHAMPS", Number: 212 },
    { Question: "Fill in the blank for the following sequence of numbers: 3, 6, 12, blank, 48", Answer: "24", Year: "10-11", Type: "CHAMPS", Number: 213 },
    { Question: "I multiplied three copies of a number together and got a result of 64. What is the number?", Answer: "4", Year: "10-11", Type: "CHAMPS", Number: 214 },
    { Question: "What number when averaged with twenty-three gives an answer of thirty-one and a half?", Answer: "40", Year: "10-11", Type: "CHAMPS", Number: 215 },
    { Question: "What is the range of the numbers: 4, 6, 8, 9, 10, 10, 12, and 14?", Answer: "10", Year: "10-11", Type: "CHAMPS", Number: 216 },
    { Question: "What number needs to be added to 33 to get a result of 178?", Answer: "145", Year: "10-11", Type: "CHAMPS", Number: 217 },
    { Question: "Four times my number plus seven equals twenty-seven. What is my number?", Answer: "5", Year: "10-11", Type: "CHAMPS", Number: 218 },
    { Question: "What is the largest counting number length the side of a triangle can be if the other two sides are 4 and 11?", Answer: "14", Year: "10-11", Type: "CHAMPS", Number: 219 },
    { Question: "What is sum of the integers from negative five through positive seven, inclusive?", Answer: "13", Year: "10-11", Type: "CHAMPS", Number: 220 },
    { Question: "Find the sum of the counting numbers from one through ten, inclusive.", Answer: "55", Year: "10-11", Type: "CHAMPS", Number: 221 },
    { Question: "Marcie rolls two fair six-sided dice. What is the probability, as a reduced fraction, that both dice show the same number?", Answer: "1/6", Year: "10-11", Type: "CHAMPS", Number: 222 },
    { Question: "What is the sum of the two numbers that are five units away from the number 3 on the number line?", Answer: "6", Year: "10-11", Type: "CHAMPS", Number: 223 },
    { Question: "Johnny took 10 minutes riding his bike to school, which is two miles away. What was Johnny's average speed in miles per hour?", Answer: "12", Year: "10-11", Type: "CHAMPS", Number: 224 },
    { Question: "What is the side length in feet of a square whose area is eighty-one square feet?", Answer: "9", Year: "10-11", Type: "MASTERS", Number: 225 },
    { Question: "Find the mean or average of the following set of numbers: three, two, two, five.", Answer: "3", Year: "10-11", Type: "MASTERS", Number: 226 },
    { Question: "One-sixth of my forty-two cookies are chocolate. How many of my cookies are not chocolate?", Answer: "35", Year: "10-11", Type: "MASTERS", Number: 227 },
    { Question: "Twice my number is fourteen less than four times my number. What is my number?", Answer: "7", Year: "10-11", Type: "MASTERS", Number: 228 },
    { Question: "My brother Donald and his sons Dan and Dennis took their two family dogs for a walk. What is the total number of human and dog feet that went on this walk?", Answer: "14", Year: "10-11", Type: "MASTERS", Number: 229 },
    { Question: "Find the product of seventeen times nine.", Answer: "153", Year: "10-11", Type: "MASTERS", Number: 230 },
    { Question: "Express the fraction six over twenty-five as a decimal number.", Answer: "0.24", Year: "10-11", Type: "MASTERS", Number: 231 },
    { Question: "Bart draws two cards from a standard deck and gets a pair of kings. How many different pairs could he have drawn?", Answer: "6", Year: "10-11", Type: "MASTERS", Number: 232 },
    { Question: "What is the largest counting number that will divide into 15, 35, 75, and 95 with no remainder?", Answer: "5", Year: "10-11", Type: "MASTERS", Number: 233 },
    { Question: "What is twenty-five percent of forty-four?", Answer: "11", Year: "10-11", Type: "MASTERS", Number: 234 },
    { Question: "Jamie adds two prime numbers and gets a 2-digit prime number as her answer. What is the smallest Jamie's answer could be?", Answer: "13", Year: "10-11", Type: "MASTERS", Number: 235 },
    { Question: "In a certain addition pattern, the first number is eight, the second number is eleven, and the third number is fourteen. What is the sum of the fifth and sixth numbers of this pattern?", Answer: "43", Year: "10-11", Type: "MASTERS", Number: 236 },
    { Question: "What is the probability of rolling a multiple of three with one fair cubical die? Express your answer as a fraction in simplest form.", Answer: "1/3", Year: "10-11", Type: "MASTERS", Number: 237 },
    { Question: "I have 10 meters of rope. Find the number of centimeters of rope that I have left after giving away 10 centimeters of rope.", Answer: "990", Year: "10-11", Type: "MASTERS", Number: 238 },
    { Question: "How many vertices or corners does a cube have?", Answer: "8", Year: "10-11", Type: "MASTERS", Number: 239 },
    { Question: "A pentagon of perimeter 74 inches has sides of 17, 20, and 13 inches. What is the average length in inches of the remaining sides?", Answer: "12", Year: "10-11", Type: "MASTERS", Number: 240 },
    { Question: "Amy has 3 pennies in her right pants pocket, 2 pennies in her left pants pocket, and 4 pennies in her shirt pocket. How many pennies does she have in all?", Answer: "9", Year: "11-12", Type: "CHAMPS", Number: 241 },
    { Question: "What is the quotient of 24 divided by 6?", Answer: "4", Year: "11-12", Type: "CHAMPS", Number: 242 },
    { Question: "What is the area, in square inches, of a rectangle with sides of length 5 inches and 8 inches?", Answer: "40", Year: "11-12", Type: "CHAMPS", Number: 243 },
    { Question: "Francie is counting by sevens. The first number she says is 7 and the second number she says is 14. What will be the ninth number Francie will say?", Answer: "63", Year: "11-12", Type: "CHAMPS", Number: 244 },
    { Question: "What is the perimeter, in inches, of a regular hexagon with side length 4 inches?", Answer: "24", Year: "11-12", Type: "CHAMPS", Number: 245 },
    { Question: "A bag contains 5 red marbles, 3 blue marbles, and 7 green marbles. If a marble is randomly selected from this bag, what is the probability that it is green? Give answer as a fraction.", Answer: "7/15", Year: "11-12", Type: "CHAMPS", Number: 246 },
    { Question: "A group of 5 turtles has an average weight per turtle of 22 ounces. What is the total weight in ounces of all 5 turtles?", Answer: "110", Year: "11-12", Type: "CHAMPS", Number: 247 },
    { Question: "How many EVEN counting numbers will divide into 48 with no remainder?", Answer: "8", Year: "11-12", Type: "CHAMPS", Number: 248 },
    { Question: "Determine the perimeter in inches of a square with area 16 square inches.", Answer: "16", Year: "11-12", Type: "MASTERS", Number: 249 },
    { Question: "What is the sixth smallest prime number?", Answer: "13", Year: "11-12", Type: "MASTERS", Number: 250 },
    { Question: "I have one dollar in change made up of only pennies and nickels. If I have 25 pennies, how many nickels do I have?", Answer: "15", Year: "11-12", Type: "MASTERS", Number: 251 },
    { Question: "Josh had three dozen chickens, but then a chicken thief came and stole one-fourth of his chickens. How many chickens does Josh have left?", Answer: "27", Year: "11-12", Type: "MASTERS", Number: 252 },
    { Question: "Alice had $19 and then earned $5 more. Bob had $19 and then spent $5. How many more dollars does Alice now have than Bob?", Answer: "10", Year: "11-12", Type: "MASTERS", Number: 253 },
    { Question: "What is three-halves minus three-fourths? Answer as a reduced fraction.", Answer: "3/4", Year: "11-12", Type: "MASTERS", Number: 254 },
    { Question: "How many counting numbers are less than 54 but greater than 10?", Answer: "43", Year: "11-12", Type: "MASTERS", Number: 255 },
    { Question: "What is the median of the following set of values? {negative two, zero, one, two, negative three}", Answer: "0", Year: "11-12", Type: "MASTERS", Number: 256 },
    { Question: "What counting number gives the product 36 when multiplied by itself?", Answer: "6", Year: "12-13", Type: "CHAMPS", Number: 257 },
    { Question: "What is one-half plus one-fourth? Give your answer as a simplified fraction.", Answer: "3/4", Year: "12-13", Type: "CHAMPS", Number: 258 },
    { Question: "What is the remainder when 45 is divided by 4?", Answer: "1", Year: "12-13", Type: "CHAMPS", Number: 259 },
    { Question: "A regular hexagon has a side length of 9 inches. What is the number of inches in its perimeter?", Answer: "54", Year: "12-13", Type: "CHAMPS", Number: 260 },
    { Question: "On average, Greta eats 3 bananas per hour. At this rate, how many bananas would she eat in two days?", Answer: "144", Year: "12-13", Type: "CHAMPS", Number: 261 },
    { Question: "Each jump of a frog is 3 feet while each jump of a rabbit is 4 feet. In a race that is 48 feet long, how many MORE jumps will the frog make than the rabbit?", Answer: "4", Year: "12-13", Type: "CHAMPS", Number: 262 },
    { Question: "How many two-digit counting numbers are multiples of both 9 and 6?", Answer: "5", Year: "12-13", Type: "CHAMPS", Number: 263 },
    { Question: "What is the sum of the digits of the three consecutive counting numbers whose sum is 2013?", Answer: "42", Year: "12-13", Type: "CHAMPS", Number: 264 },
    { Question: "What is the largest counting number you can make using all the following digits once each? The digits are four, seven, two, zero, and five.", Answer: "75420", Year: "12-13", Type: "MASTERS", Number: 265 },
    { Question: "What is 15 percent of 80?", Answer: "12", Year: "12-13", Type: "MASTERS", Number: 266 },
    { Question: "Up to four penguins can live on one iceberg. What is the least number of icebergs that could hold 25 penguins?", Answer: "7", Year: "12-13", Type: "MASTERS", Number: 267 },
    { Question: "If a polygon has 9 sides, how many vertices does it have? Answer can't tell if there is not enough information to answer the question.", Answer: "9", Year: "12-13", Type: "MASTERS", Number: 268 },
    { Question: "Chris catches fish at a rate of five fish per hour. Dana catches fish at a rate of seven fish per hour. If they both fish for three and a half hours, how many fish will they catch altogether?", Answer: "42", Year: "12-13", Type: "MASTERS", Number: 269 },
    { Question: "Ravens have 2 feet and wolves have 4 feet. In a zoo enclosure, there are 3 ravens and some wolves. There are 90 feet total in the enclosure. How many wolves are in the enclosure?", Answer: "21", Year: "12-13", Type: "MASTERS", Number: 270 },
    { Question: "I am thinking of an odd counting number that has two digits, both the same. What is my number if it has a remainder of 1 when divided by 6?", Answer: "55", Year: "12-13", Type: "MASTERS", Number: 271 },
    { Question: "There are five different books on a bookshelf. Three of them are colored red, one is colored blue, and one is colored green. How many ways are there to arrange the books in a row such that the red books are next to each other?", Answer: "36", Year: "12-13", Type: "MASTERS", Number: 272 },
    { Question: "What is the sum of fifteen and seventeen?", Answer: "32", Year: "13-14", Type: "CHAMPS", Number: 273 },
    { Question: "At Biff and Eho's farm they have 5 chickens and 9 cows. How many animal feet are on Biff and Eho's farm?", Answer: "46", Year: "13-14", Type: "CHAMPS", Number: 274 },
    { Question: "The timer on Marcy's microwave only accepts seconds for the time. The recipe calls for 8 minutes and 45 seconds. How many seconds should be entered on Marcy's microwave?", Answer: "525", Year: "13-14", Type: "CHAMPS", Number: 275 },
    { Question: "During toy production, 3 out of every 500 toys made are defective. If twenty-five thousand toys are made, how many toys will be defective?", Answer: "150", Year: "13-14", Type: "CHAMPS", Number: 276 },
    { Question: "Tara got a score of 17 on a quiz worth 20 points. Her score was what percentage of the total?", Answer: "85", Year: "13-14", Type: "CHAMPS", Number: 277 },
    { Question: "Sarah writes out counting numbers with words, starting with 1 (which she writes O-N-E). If Sarah spells correctly, what is the smallest number she will write that contains the letter A?", Answer: "1000", Year: "13-14", Type: "CHAMPS", Number: 278 },
    { Question: "It is 4:30 p.m. on March 7th. The minute hand on the clock turns around 40 times. What DATE is it?", Answer: "March 9th", Year: "13-14", Type: "CHAMPS", Number: 279 },
    { Question: "In cubic inches, how much greater is the volume of a cube of side length 3 inches than that of a cube of side length 2 inches?", Answer: "19", Year: "13-14", Type: "CHAMPS", Number: 280 },
    { Question: "If three tangerines weigh the same as one apple, how many tangerines will it take to weigh the same as six apples?", Answer: "18", Year: "13-14", Type: "MASTERS", Number: 281 },
    { Question: "What is the smallest whole number you could multiply by seven to get a product greater than ninety?", Answer: "13", Year: "13-14", Type: "MASTERS", Number: 282 },
    { Question: "How many squares, each having a perimeter of 12 centimeters, can be cut from a square having a perimeter of 60 centimeters?", Answer: "25", Year: "13-14", Type: "MASTERS", Number: 283 },
    { Question: "What is the smallest whole number greater than the sum of two-thirds, three-fourths, and four-fifths?", Answer: "3", Year: "13-14", Type: "MASTERS", Number: 284 },
    { Question: "Sandy has two dollars and seventy-five cents, all in quarters. Chris has the same amount of money, all in nickels. How many more coins does Chris have than Sandy?", Answer: "44", Year: "13-14", Type: "MASTERS", Number: 285 },
    { Question: "If it will be midnight in seventy-six minutes, what time is it now? Be sure to include AM or PM with your answer.", Answer: "10:44 PM", Year: "13-14", Type: "MASTERS", Number: 286 },
    { Question: "Today is May seventeenth, and seventeen is an odd number. Find the sum of all the odd-numbered days in May that are after today.", Answer: "175", Year: "13-14", Type: "MASTERS", Number: 287 },
    { Question: "I am thinking of a simplified fraction whose value is between one-fourth and one-half. The denominator of my fraction is 6 more than the numerator. What is my fraction?", Answer: "5/11", Year: "13-14", Type: "MASTERS", Number: 288 },
    { Question: "If Jill has 6 bananas and Ron has 13 cantaloupes, how many pieces of fruit do they have together?", Answer: "19", Year: "14-15", Type: "CHAMPS", Number: 289 },
    { Question: "What is the perimeter of an octagon with all the sides of length 4 centimeters?", Answer: "32", Year: "14-15", Type: "CHAMPS", Number: 290 },
    { Question: "If a butterfly travels 12 feet a minute, how many minutes will it take the butterfly to travel 72 feet?", Answer: "6", Year: "14-15", Type: "CHAMPS", Number: 291 },
    { Question: "What is one-third plus one-sixth? Give your answer as a reduced fraction.", Answer: "1/2", Year: "14-15", Type: "CHAMPS", Number: 292 },
    { Question: "How many possible outcomes are there from rolling two fair nine-sided dice?", Answer: "81", Year: "14-15", Type: "CHAMPS", Number: 293 },
    { Question: "A fry cook can grill eight hamburgers in 10 minutes. How many hamburgers can he grill in one hour?", Answer: "48", Year: "14-15", Type: "CHAMPS", Number: 294 },
    { Question: "All the books in a certain library are numbered only with counting numbers, and are numbered one to five hundred. Millie decides to check out books numbered thirty-three through forty-seven. How many books did she check out?", Answer: "15", Year: "14-15", Type: "CHAMPS", Number: 295 },
    { Question: "Eho has a watch that gains 2 minutes each hour. He sets his watch to the correct time at 4:44 a.m. What time does his watch show, when the correct time is 3:14 p.m. on the same day?", Answer: "3:35 PM", Year: "14-15", Type: "CHAMPS", Number: 296 },
    { Question: "Josiah ran 50 yards. How many feet did he run?", Answer: "150", Year: "14-15", Type: "MASTERS", Number: 297 },
    { Question: "What is the product of 15 and 26?", Answer: "390", Year: "14-15", Type: "MASTERS", Number: 298 },
    { Question: "What is three-fourths of five-eighths?", Answer: "15/32", Year: "14-15", Type: "MASTERS", Number: 299 },
    { Question: "My garden fence creates a six feet by four feet rectangle. If I reuse all of this fencing to make a new garden in the shape of an equilateral triangle, what is the length of each side of the new garden, in feet?", Answer: "20/3", Year: "14-15", Type: "MASTERS", Number: 300 },
    { Question: "If one percent of the 2000 students at Westside High School volunteered at the Math is Cool tournament, how many students volunteered?", Answer: "20", Year: "14-15", Type: "MASTERS", Number: 301 },
    { Question: "Georgia has 75 pieces of bubble gum. If she gives 5 pieces to each of 6 friends, how many pieces of bubble gum does she have left?", Answer: "45", Year: "14-15", Type: "MASTERS", Number: 302 },
    { Question: "How many positive numbers less than fifty are divisible by either 8 or 3, but not both?", Answer: "18", Year: "14-15", Type: "MASTERS", Number: 303 },
    { Question: "What is the largest three-digit number with three distinct digits that are all prime numbers?", Answer: "753", Year: "14-15", Type: "MASTERS", Number: 304 },
    { Question: "If a dog can chase seventeen cats, how many cats can five dogs chase?", Answer: "85", Year: "15-16", Type: "CHAMPS", Number: 305 },
    { Question: "What is the sum of (three hundred sixty-five) and (one hundred eighty-seven)?", Answer: "552", Year: "15-16", Type: "CHAMPS", Number: 306 },
    { Question: "Currently Fred is twelve years old and Ed is fifteen years old. What will the sum of their ages be in four years?", Answer: "35", Year: "15-16", Type: "CHAMPS", Number: 307 },
    { Question: "Biff had eighteen dollars in his piggy bank. Each week for seven weeks he put six more dollars in his piggy bank. How many dollars does he have now?", Answer: "60", Year: "15-16", Type: "CHAMPS", Number: 308 },
    { Question: "Sixty cows drink nine hundred gallons of water each day. How many gallons of water does each cow drink every day?", Answer: "15", Year: "15-16", Type: "CHAMPS", Number: 309 },
    { Question: "In a severe winter storm it was snowing at a rate of (one and a half) inches of snow every thirty minutes. How many hours would it take to snow a total of one foot?", Answer: "4", Year: "15-16", Type: "CHAMPS", Number: 310 },
    { Question: "Eho bought a pencil and a pencil sharpener for a total of two dollars and fifty cents. The pencil sharpener cost a dollar more than the pencil. How much, in dollars, did the pencil sharpener cost?", Answer: "1.75", Year: "15-16", Type: "CHAMPS", Number: 311 },
    { Question: "If three workers can build four houses in three months, how many workers are needed to build ten houses in (four and a half) months?", Answer: "5", Year: "15-16", Type: "CHAMPS", Number: 312 },
    { Question: "John has five bananas and Jake has nine bananas. How many bananas should Jake give to John so that they each have the same number of bananas?", Answer: "2", Year: "15-16", Type: "MASTERS", Number: 313 },
    { Question: "John will get a golden star if he gets an average of 90 on his history tests. He received an 84 on the first history test. What is the lowest score he can get on the second test to get a golden star?", Answer: "96", Year: "15-16", Type: "MASTERS", Number: 314 },
    { Question: "The number 195 can be written as a sum of 3 consecutive integers. What integer is the largest of those 3 integers?", Answer: "66", Year: "15-16", Type: "MASTERS", Number: 315 },
    { Question: "What are the next two numbers in the pattern: 100, 85, 70, 55,...?", Answer: "40, 25", Year: "15-16", Type: "MASTERS", Number: 316 },
    { Question: "Dan and Ethan stand at the same point. Dan runs north 15 feet and Ethan runs east 20 feet. What is the distance between Dan and Ethan?", Answer: "25", Year: "15-16", Type: "MASTERS", Number: 317 },
    { Question: "What is the area of a flat cookie with a radius of 4? Express your answer in terms of π.", Answer: "16π", Year: "15-16", Type: "MASTERS", Number: 318 },
    { Question: "How many perfect squares are greater than 2 and less than 20?", Answer: "3", Year: "15-16", Type: "MASTERS", Number: 319 },
    { Question: "If Manny flips a coin five times, what is the probability that he gets heads every time, expressed as a common fraction?", Answer: "1/32", Year: "15-16", Type: "MASTERS", Number: 320 },
    { Question: "What is one hundred minus seventy-five?", Answer: "25", Year: "16-17", Type: "CHAMPS", Number: 321 },
    { Question: "What is (one thousand, one hundred) plus (five hundred fifty)?", Answer: "1650", Year: "16-17", Type: "CHAMPS", Number: 322 },
    { Question: "What is (four point seven) times ten?", Answer: "47", Year: "16-17", Type: "CHAMPS", Number: 323 },
    { Question: "What number is one-half of two hundred thirty?", Answer: "115", Year: "16-17", Type: "CHAMPS", Number: 324 },
    { Question: "In one day an elephant ate 83 kilograms of hay, 7 kilograms of apples, and 10 kilograms of leaves. How many kilograms of food did it eat in all?", Answer: "100", Year: "16-17", Type: "CHAMPS", Number: 325 },
    { Question: "If 203 carrots are to be shared equally among 7 horses, how many carrots should each horse receive?", Answer: "29", Year: "16-17", Type: "CHAMPS", Number: 326 },
    { Question: "What is the total price, in dollars, of one dozen ears of corn that cost twenty-five cents each?", Answer: "3", Year: "16-17", Type: "CHAMPS", Number: 327 },
    { Question: "Solve: (three thousand, six hundred four) plus (five thousand, one hundred eighty-six) plus (seven thousand, one hundred forty-five).", Answer: "15935", Year: "16-17", Type: "CHAMPS", Number: 328 },
    { Question: "Phil is rolling a standard six-sided die. What is the probability that he rolls a 5?", Answer: "1/6", Year: "16-17", Type: "MASTERS", Number: 329 },
    { Question: "What is the range of the data set, nine [PAUSE], twenty-seven [PAUSE], seventeen [PAUSE], five [PAUSE], nineteen?", Answer: "22", Year: "16-17", Type: "MASTERS", Number: 330 },
    { Question: "Mildred buys a bag of thirty candies for herself and her five girlfriends. If each of them gets an equal amount of candy, how many pieces does each girl get?", Answer: "5", Year: "16-17", Type: "MASTERS", Number: 331 },
    { Question: "Gary's English homework is to finish twenty percent of a novel. If the book has five hundred pages, how many pages does he need to read?", Answer: "100", Year: "16-17", Type: "MASTERS", Number: 332 },
    { Question: "Hex has a big, pretty garden. The dimensions of the rectangular garden are twelve feet by twenty-five feet. What is the perimeter, in feet, of Hex's garden?", Answer: "74", Year: "16-17", Type: "MASTERS", Number: 333 },
    { Question: "Grace has divided all her money evenly into two containers. Then, she decides to give 42 of her dollars away to her mom. Now, she only has 8 dollars total left. How many dollars did Grace originally have in one container?", Answer: "25", Year: "16-17", Type: "MASTERS", Number: 334 },
    { Question: "As a reduced fraction, what is the sum of one fourth and one sixteenth?", Answer: "5/16", Year: "16-17", Type: "MASTERS", Number: 335 },
    { Question: "Jane has three skirts, five shirts, and seven pairs of socks. If an outfit is comprised of a shirt, a skirt, and a pair of socks, how many distinct outfits does Jane have?", Answer: "105", Year: "16-17", Type: "MASTERS", Number: 336 },
    { Question: "What is 6 times 5 times 9?", Answer: "270", Year: "17-18", Type: "CHAMPS", Number: 337 },
    { Question: "What is the quotient of 56 divided by 8?", Answer: "7", Year: "17-18", Type: "CHAMPS", Number: 338 },
    { Question: "What is the perimeter of a rectangle with sides of length 8 inches and 6 inches?", Answer: "28", Year: "17-18", Type: "CHAMPS", Number: 339 },
    { Question: "A sloth eats 3 eucalyptus leaves every day. How many leaves will 2 sloths eat in 1 week?", Answer: "42", Year: "17-18", Type: "CHAMPS", Number: 340 },
    { Question: "A fair six-sided die is rolled twice. What is the probability of rolling a 4 followed by a 3?", Answer: "1/36", Year: "17-18", Type: "CHAMPS", Number: 341 },
    { Question: "How many minutes will it take me to bike 9 miles if I am biking at a speed of 12 miles per hour?", Answer: "45", Year: "17-18", Type: "CHAMPS", Number: 342 },
    { Question: "A group of 4 people has an average of $6 each. If a fifth person joins the group, and now the average is $7 per person, how much money, in dollars, did the fifth person bring to the group?", Answer: "11", Year: "17-18", Type: "CHAMPS", Number: 343 },
    { Question: "If today is Saturday, then what day will it be 184 days from now?", Answer: "Monday", Year: "17-18", Type: "CHAMPS", Number: 344 },
    { Question: "John is 5 feet and 6 inches tall. In inches, how tall is John?", Answer: "66", Year: "17-18", Type: "MASTERS", Number: 345 },
    { Question: "What is the product of 35 and 16?", Answer: "560", Year: "17-18", Type: "MASTERS", Number: 346 },
    { Question: "What is two-thirds of five-sevenths?", Answer: "10/21", Year: "17-18", Type: "MASTERS", Number: 347 },
    { Question: "My garden fence creates a regular hexagon with side lengths of 4 feet. If I reuse all of this fencing to make a new garden in the shape of an equilateral triangle, what is the length, in feet, of each side of the new garden?", Answer: "8", Year: "17-18", Type: "MASTERS", Number: 348 },
    { Question: "If two percent of the 4000 students at Moses Lake High School volunteered at the Math is Cool tournament, how many students volunteered?", Answer: "80", Year: "17-18", Type: "MASTERS", Number: 349 },
    { Question: "Mike has 84 pieces of candy. If he gives 5 pieces of candy to each of his friends and has 9 pieces left, how many friends did he give candy to?", Answer: "15", Year: "17-18", Type: "MASTERS", Number: 350 },
    { Question: "How many positive numbers less than eighty are divisible by either 9 or 4 but not both?", Answer: "23", Year: "17-18", Type: "MASTERS", Number: 351 },
    { Question: "What is the largest two-digit prime number that contains one even digit and one odd digit?", Answer: "89", Year: "17-18", Type: "MASTERS", Number: 352 },
    { Question: "What is the product of seven and eight?", Answer: "56", Year: "18-19", Type: "CHAMPS", Number: 353 },
    { Question: "What is the next number in the arithmetic sequence that starts as follows: one, four, seven, ten, thirteen?", Answer: "16", Year: "18-19", Type: "CHAMPS", Number: 354 },
    { Question: "If it takes three dogs to chase seven cats, how many dogs will it take to chase forty-nine cats?", Answer: "21", Year: "18-19", Type: "CHAMPS", Number: 355 },
    { Question: "If one van can haul six mathletes at most, how many vans are needed to transport thirty-eight mathletes to the math contest?", Answer: "7", Year: "18-19", Type: "CHAMPS", Number: 356 },
    { Question: "Biff rolled two six-sided dice. In how many ways can a sum of five be obtained?", Answer: "4", Year: "18-19", Type: "CHAMPS", Number: 357 },
    { Question: "Nine clowns were each holding five balloons when a windstorm came up, and three of the clowns each lost two balloons. How many total balloons do the clowns have now?", Answer: "39", Year: "18-19", Type: "CHAMPS", Number: 358 },
    { Question: "Eho spent twice as much money on a calculator as he did a protractor. If he spent a total of fifteen dollars, how many dollars did Eho spend on the calculator?", Answer: "10", Year: "18-19", Type: "CHAMPS", Number: 359 },
    { Question: "John can run at a speed of twenty feet per second and Bobby can run six hundred ten feet every thirty seconds. How many feet further will Bobby run than John in one minute?", Answer: "20", Year: "18-19", Type: "CHAMPS", Number: 360 },
    { Question: "What is the positive difference between 35 and 28?", Answer: "7", Year: "18-19", Type: "MASTERS", Number: 361 },
    { Question: "What is six squared?", Answer: "36", Year: "18-19", Type: "MASTERS", Number: 362 },
    { Question: "What is two point three times twenty?", Answer: "46", Year: "18-19", Type: "MASTERS", Number: 363 },
    { Question: "Emily goes to the farmer's market and buys seven cucumbers for a total of ninety-one cents. How many cents does one cucumber cost?", Answer: "13", Year: "18-19", Type: "MASTERS", Number: 364 },
    { Question: "If yesterday was Tuesday, what day of the week will it be three days before two weeks from now?", Answer: "Sunday", Year: "18-19", Type: "MASTERS", Number: 365 },
    { Question: "Angle A is complementary to angle B, and angle B is complementary to angle C. If angle B is eighty (eight-zero) degrees, what is the sum of the measures of angle A and angle C?", Answer: "20", Year: "18-19", Type: "MASTERS", Number: 366 },
    { Question: "A spelling bee is down to six finalists. From these six finalists, how many ways are there to award first, second, and third places, assuming no ties?", Answer: "120", Year: "18-19", Type: "MASTERS", Number: 367 },
    { Question: "You roll a standard six-sided die two times in a row. As a reduced fraction, what is the probability that you will roll a prime number first, followed by a composite number?", Answer: "1/6", Year: "18-19", Type: "MASTERS", Number: 368 },
    { Question: "What is the product of nine and six?", Answer: "54", Year: "19-20", Type: "CHAMPS", Number: 369 },
    { Question: "What is the perimeter of a square with side length five?", Answer: "20", Year: "19-20", Type: "CHAMPS", Number: 370 },
    { Question: "What is the next number in the arithmetic sequence that begins: two, six, ten, and fourteen?", Answer: "18", Year: "19-20", Type: "CHAMPS", Number: 371 },
    { Question: "If it takes eight cowboys to lasso three bulls, how many cowboys does it take to lasso twelve bulls?", Answer: "32", Year: "19-20", Type: "CHAMPS", Number: 372 },
    { Question: "How many MINUTES will it take me to bike five miles if I am biking at a speed of fifteen miles per hour?", Answer: "20", Year: "19-20", Type: "CHAMPS", Number: 373 },
    { Question: "Kirby spent three times as much on a hamburger than his soda. If Kirby spent twelve dollars in all, how much did Kirby's soda cost, in dollars?", Answer: "3", Year: "19-20", Type: "CHAMPS", Number: 374 },
    { Question: "If today is Friday, then what day will it be one hundred fifty-seven days from now?", Answer: "Monday", Year: "19-20", Type: "CHAMPS", Number: 375 },
    { Question: "What is the smallest positive whole number by which the number twenty can be multiplied to obtain a perfect square number?", Answer: "5", Year: "19-20", Type: "CHAMPS", Number: 376 },
    { Question: "If I evenly distribute half of my money among three friends and each friend now has three dollars, how many dollars did I have to start with?", Answer: "18", Year: "20-21", Type: "CHAMPS", Number: 377 },
    { Question: "How many feet are in 60 inches?", Answer: "5", Year: "20-21", Type: "CHAMPS", Number: 378 },
    { Question: "What is the area of the floor of a rectangular room with length 13 feet and width 15 feet?", Answer: "195", Year: "20-21", Type: "CHAMPS", Number: 379 },
    { Question: "What is fifteen percent of eighty?", Answer: "12", Year: "20-21", Type: "CHAMPS", Number: 380 },
    { Question: "What is the median of the following set of numbers: 13, 3, 11, and 100?", Answer: "12", Year: "20-21", Type: "CHAMPS", Number: 381 },
    { Question: "The probability of drawing a red King, red Queen, or red Jack from a standard deck of 52 cards can be expressed as a reduced fraction equal to X over 26. What is X?", Answer: "3", Year: "20-21", Type: "CHAMPS", Number: 382 },
    { Question: "What is the perimeter of the polygon created by connecting the points (one comma two), (four comma two), (one comma five), and (four comma five)?", Answer: "12", Year: "20-21", Type: "CHAMPS", Number: 383 },
    { Question: "What is the largest two-digit, composite integer that is not a multiple of two, three, or five?", Answer: "91", Year: "20-21", Type: "CHAMPS", Number: 384 },
    { Question: "What is sixty-four plus thirty-five?", Answer: "99", Year: "20-21", Type: "MASTERS", Number: 385 },
    { Question: "Janissa wants to buy five bottles of water. How much, in cents, will Janissa spend if each bottle is one dollar and fifty cents?", Answer: "750", Year: "20-21", Type: "MASTERS", Number: 386 },
    { Question: "What is the next term in the sequence: 15, 7, -1, -9, ...?", Answer: "-17", Year: "20-21", Type: "MASTERS", Number: 387 },
    { Question: "If a bunch of seven bananas cost two dollars and ninety-four cents, how many cents is one banana?", Answer: "42", Year: "20-21", Type: "MASTERS", Number: 388 },
    { Question: "Let 'A' represent the number of positive two-digit integers and let 'B' represent the number of positive one-digit integers. What is the value of A - B?", Answer: "81", Year: "20-21", Type: "MASTERS", Number: 389 },
    { Question: "Riley has three quarters, two dimes, five nickels, and thirty-two pennies. How many cents does she have in all?", Answer: "152", Year: "20-21", Type: "MASTERS", Number: 390 },
    { Question: "On a coordinate plane, the point with coordinates (2, -3) is translated four units to the left, then five units up. What is the sum of the coordinates of the new point?", Answer: "0", Year: "20-21", Type: "MASTERS", Number: 391 },
    { Question: "A state math competition has six final competitors. If each competitor fist-bumps each other competitor once before and once after the competition, how many fist-bumps were exchanged?", Answer: "30", Year: "20-21", Type: "MASTERS", Number: 392 },
    { Question: "Jackson stacks 200 cartons an hour. If he stacks cartons for 4 and one-half hours, how many cartons has he stacked?", Answer: "900", Year: "21-22", Type: "CHAMPS", Number: 393 },
    { Question: "If 5% of the 300 students at Springfield Elementary School are on the math team, how many students are on the math team?", Answer: "15", Year: "21-22", Type: "CHAMPS", Number: 394 },
    { Question: "If the perimeter of a square is 32 feet, what is the area of the square in square feet?", Answer: "64", Year: "21-22", Type: "CHAMPS", Number: 395 },
    { Question: "What number is half-way between 3 and 11 on a number line?", Answer: "7", Year: "21-22", Type: "CHAMPS", Number: 396 },
    { Question: "What is the next number in the geometric series that begins: ½, 1, 2, 4, 8?", Answer: "16", Year: "21-22", Type: "CHAMPS", Number: 397 },
    { Question: "If three fourths of my number is 27, what is my number?", Answer: "36", Year: "21-22", Type: "CHAMPS", Number: 398 },
    { Question: "Seth has 7 quarters and his friend Gage has some dimes and nickels. What is the least number of coins that Gage must have for them to have at least $2.50 in total?", Answer: "8", Year: "21-22", Type: "CHAMPS", Number: 399 },
    { Question: "How many 2-digit positive integers have digits that differ by 7?", Answer: "5", Year: "21-22", Type: "CHAMPS", Number: 400 },
    { Question: "How many minutes are there between 10:45 AM and 12 noon on the same day?", Answer: "75", Year: "21-22", Type: "Masters", Number: 401 },
    { Question: "What is the largest counting number that can be made by using all of the following digits once each? Five, seven, two and nine.", Answer: "9752", Year: "21-22", Type: "Masters", Number: 402 },
    { Question: "Brayden draws three triangles and one rectangle on his paper, with none of the shapes overlapping. How many total vertices does he draw?", Answer: "13", Year: "21-22", Type: "Masters", Number: 403 },
    { Question: "What is the smallest whole number you could multiply 8 by to get a product that is greater than one hundred?", Answer: "13", Year: "21-22", Type: "Masters", Number: 404 },
    { Question: "Jacob has three dollars and forty cents in dimes. How many dimes does Jacob have?", Answer: "34", Year: "21-22", Type: "Masters", Number: 405 },
    { Question: "What is the product of 26 and 13?", Answer: "338", Year: "21-22", Type: "Masters", Number: 406 },
    { Question: "What is the median of the following set of six numbers? {10, 15, 8, 22, 5, 12}", Answer: "11", Year: "21-22", Type: "Masters", Number: 407 },
    { Question: "How many even 5-digit counting numbers are there?", Answer: "45000", Year: "21-22", Type: "Masters", Number: 408 },
    { Question: "If ten out of every twenty-five students at Medina Elementary School are on the math team, then how many of the 100 total students are on the math team?", Answer: "40", Year: "22-23", Type: "CHAMPS", Number: 409 },
    { Question: "What is five squared?", Answer: "25", Year: "22-23", Type: "CHAMPS", Number: 410 },
    { Question: "Sebastian goes to Ferdinand's Creamery to get an ice cream cone with one scoop of ice cream. They have three types of cones and eleven flavors of ice cream. How many different combinations can Sebastian order?", Answer: "33", Year: "22-23", Type: "CHAMPS", Number: 411 },
    { Question: "How many cents are fourteen nickels and two dimes worth?", Answer: "90", Year: "22-23", Type: "CHAMPS", Number: 412 },
    { Question: "What is the value of x if x plus seven equals twenty-three?", Answer: "16", Year: "22-23", Type: "CHAMPS", Number: 413 },
    { Question: "Find the sum of the next two terms in the arithmetic sequence that begins: one, four, seven, and so on.", Answer: "23", Year: "22-23", Type: "CHAMPS", Number: 414 },
    { Question: "What is the perimeter in centimeters of a square with an area of eighty-one square centimeters?", Answer: "36", Year: "22-23", Type: "CHAMPS", Number: 415 },
    { Question: "How many positive integer factors does twenty-four have?", Answer: "8", Year: "22-23", Type: "CHAMPS", Number: 416 },
    { Question: "Gustavo reads twelve pages of his book every night. If his book has two hundred forty pages, how many nights will it take him to read his book?", Answer: "20", Year: "22-23", Type: "Masters", Number: 417 },
    { Question: "What is the next term in the sequence that begins: Three, four, six, nine, thirteen, and so on?", Answer: "18", Year: "22-23", Type: "Masters", Number: 418 },
    { Question: "If Olivia has one dollar and twenty-nine cents, and Arjun has seventy-three cents, how much more money, in cents does Olivia have than Arjun?", Answer: "56", Year: "22-23", Type: "Masters", Number: 419 },
    { Question: "What is the smallest perfect square greater than one hundred?", Answer: "121", Year: "22-23", Type: "Masters", Number: 420 },
    { Question: "What is the perimeter in inches of a rectangle with side lengths of three point two inches and four point eight inches?", Answer: "16", Year: "22-23", Type: "Masters", Number: 421 },
    { Question: "Parth has twenty marbles. Five of the marbles are red, three of the marbles are green, and the rest are blue. What percentage of the marbles are blue?", Answer: "60", Year: "22-23", Type: "Masters", Number: 422 },
    { Question: "How many ways are there to rearrange the letters A, B, C and D from left to right, if A and B refuse to be next to each other?", Answer: "12", Year: "22-23", Type: "Masters", Number: 423 },
    { Question: "Kylie's average score on three tests is ninety points. What is her new average score in points if on her fourth test she scores a sixty-six?", Answer: "84", Year: "22-23", Type: "Masters", Number: 424 },
    { Question: "Jake got three bags of candy for his birthday. The first bag had three pieces, the second bag had four pieces, and the final bag had five pieces. How many pieces of candy did Jake get for his birthday?", Answer: "12", Year: "23-24", Type: "Champs", Number: 425 },
    { Question: "What is the area in square units of a square with side length 5 units?", Answer: "25", Year: "23-24", Type: "Champs", Number: 426 },
    { Question: "What is x plus seven minus two if x equals four?", Answer: "9", Year: "23-24", Type: "Champs", Number: 427 },
    { Question: "What is twenty percent of one hundred fifty?", Answer: "30", Year: "23-24", Type: "Champs", Number: 428 },
    { Question: "What is the largest palindrome that is less than five hundred?", Answer: "494", Year: "23-24", Type: "Champs", Number: 429 },
    { Question: "What is the average of the following set: two, eight, fourteen, five, six?", Answer: "7", Year: "23-24", Type: "Champs", Number: 430 },
    { Question: "A sequence of shapes begins with: triangle, pentagon, square, octagon, then keeps repeating in the same order. How many sides does the twenty-sixth shape in the sequence have?", Answer: "5", Year: "23-24", Type: "Champs", Number: 431 },
    { Question: "Carter has twelve quarters, eleven dimes, seven nickels, and four pennies. He is buying a chocolate bar that costs two dollars and forty-eight cents. If he is returned his change in pennies, how many pennies will he get back?", Answer: "201", Year: "23-24", Type: "Champs", Number: 432 },
    { Question: "There are forty students in the orchestra, and one-quarter of them play the viola. How many students play the viola?", Answer: "10", Year: "23-24", Type: "Masters", Number: 433 },
    { Question: "What is the largest perfect square less than one hundred?", Answer: "81", Year: "23-24", Type: "Masters", Number: 434 },
    { Question: "Solve for z: three times seven equals z minus four", Answer: "25", Year: "23-24", Type: "Masters", Number: 435 },
    { Question: "What is the next number in the following sequence? Five, sixty-six, seven hundred seventy-seven, eight thousand eight hundred eighty-eight, and so on.", Answer: "99999", Year: "23-24", Type: "Masters", Number: 436 },
    { Question: "How many minutes are in two point two five hours?", Answer: "135", Year: "23-24", Type: "Masters", Number: 437 },
    { Question: "A one pound bag of frozen corn costs three dollars and twenty cents. How many cents does one ounce of the corn cost?", Answer: "20", Year: "23-24", Type: "Masters", Number: 438 },
    { Question: "A right triangle has an angle measuring sixty-two degrees. In degrees, what is the measurement of the smallest angle in the triangle?", Answer: "28", Year: "23-24", Type: "Masters", Number: 439 },
    { Question: "Sunnyside Elementary 5th grade students are going to watch a new movie. They ordered one large popcorn for seven dollars and forty movie tickets. They spent a total of four hundred and forty-seven dollars. In dollars, how much does one movie ticket cost?", Answer: "11", Year: "23-24", Type: "Masters", Number: 440 },
    { Question: "What is three hundred and forty-five minus three hundred and five?", Answer: "40", Year: "24-25", Type: "CHAMPS", Number: 441 },
    { Question: "What is the largest positive integer factor of twenty-four minus the smallest positive integer factor of twenty-four?", Answer: "23", Year: "24-25", Type: "CHAMPS", Number: 442 },
    { Question: "What is the area in square meters of a triangle with a height of two meters and a base of four meters?", Answer: "4", Year: "24-25", Type: "CHAMPS", Number: 443 },
    { Question: "If Sasha has fifteen dimes and Olivia has three quarters how many cents do they have in total?", Answer: "225", Year: "24-25", Type: "CHAMPS", Number: 444 },
    { Question: "x minus fourteen equals ten. What is x?", Answer: "24", Year: "24-25", Type: "CHAMPS", Number: 445 },
    { Question: "The first six Fibonacci numbers are zero one one two three and five. What is the average of the first six Fibonacci numbers?", Answer: "2", Year: "24-25", Type: "CHAMPS", Number: 446 },
    { Question: "The product of two numbers is one hundred and twelve and four times the first number is sixty-four. What is the second number?", Answer: "7", Year: "24-25", Type: "CHAMPS", Number: 447 },
    { Question: "If one machine can make one hundred pencils every thirty minutes how many hours will it take two machines to make two thousand pencils?", Answer: "5", Year: "24-25", Type: "CHAMPS", Number: 448 },
    { Question: "In square inches what is the area of a right triangle with leg lengths three and eight inches?", Answer: "12", Year: "24-25", Type: "Masters", Number: 449 },
    { Question: "Two integers have a sum of fourteen and a product of forty-five. What is the larger of the two integers?", Answer: "9", Year: "24-25", Type: "Masters", Number: 450 },
    { Question: "How many yards are in eighty-one feet?", Answer: "27", Year: "24-25", Type: "Masters", Number: 451 },
    { Question: "Which of the following numbers is not a factor of thirty-six? Three twelve one eight two eighteen six", Answer: "8", Year: "24-25", Type: "Masters", Number: 452 },
    { Question: "What is the median of the following data set? Five nine six four five", Answer: "5", Year: "24-25", Type: "Masters", Number: 453 },
    { Question: "What number tripled is half of 54?", Answer: "9", Year: "24-25", Type: "Masters", Number: 454 },
    { Question: "Macy has two yellow two red and two green marbles. One red marble is worth three yellow marbles. One yellow marble is worth three green marbles. Macy converts all of her marbles to green marbles. How many green marbles does she have?", Answer: "26", Year: "24-25", Type: "Masters", Number: 455 },
    { Question: "Using only the digits one two or three how many odd three-digit positive integers can be made assuming that digits can be used more than once?", Answer: "18", Year: "24-25", Type: "Masters", Number: 456 },
    { Question: "What is the greatest common factor of 24 and 30?", Answer: "6", Year: "24-25", Type: "MASTERS", Number: 457 },
    { Question: "Find the product of 5 cubed and 2 squared.", Answer: "500", Year: "24-25", Type: "MASTERS", Number: 458 },
    { Question: "How many ways can you arrange 2 different algebra books and 3 different geometry books on a shelf if the algebra books and the geometry books must stay together?", Answer: "24", Year: "24-25", Type: "MASTERS", Number: 459 },
    { Question: "How many times is the digit 2 used in the numbers 1 through 30?", Answer: "13", Year: "24-25", Type: "MASTERS", Number: 460 },
    { Question: "Evaluate: 5 factorial minus 3 factorial.", Answer: "114", Year: "24-25", Type: "MASTERS", Number: 461 },
    { Question: "What quadrant is the point -8 comma -2 located?", Answer: "3rd", Year: "24-25", Type: "MASTERS", Number: 462 },
    { Question: "What is the area of a trapezoid whose height is 8 and bases have a sum of 12?", Answer: "48", Year: "24-25", Type: "MASTERS", Number: 463 },
    { Question: "What is the least common multiple of 12 and 16?", Answer: "48", Year: "24-25", Type: "MASTERS", Number: 464 },
    { Question: "What percentage of the numbers, 1 through 10, are prime?", Answer: "40", Year: "24-25", Type: "MASTERS", Number: 465 },
    { Question: "Find the result after 20 is divided by 1/2 and 10 is added to the quotient.", Answer: "50", Year: "24-25", Type: "MASTERS", Number: 466 },
    { Question: "What is the month and day of the sixty-eighth day of a leap year?", Answer: "March 8th", Year: "24-25", Type: "MASTERS", Number: 467 },
    { Question: "Find the sum of the number of perfect squares between 10 and 103, and half the number of pints in a quart.", Answer: "8", Year: "24-25", Type: "MASTERS", Number: 468 },
    { Question: "The sum of the diameter and the radius of a certain circle is 9. What is the circumference of this circle?", Answer: "6π", Year: "24-25", Type: "MASTERS", Number: 469 },
    { Question: "What percent of 60 is 18?", Answer: "30", Year: "24-25", Type: "MASTERS", Number: 470 },
    { Question: "How many perfect squares are between 10 and 150?", Answer: "9", Year: "24-25", Type: "MASTERS", Number: 471 },
    { Question: "Find the hypotenuse of a right triangle if the two legs are 10 and 24?", Answer: "26", Year: "24-25", Type: "MASTERS", Number: 472 },
        ]
    
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(20);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [isRetryMode, setIsRetryMode] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  // Text-to-speech function
  const speakText = (text, onComplete = null) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.6;
      utterance.pitch = 0.7;
      utterance.volume = 1.0;
      
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('susan') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.gender === 'female'
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      if (onComplete) {
        utterance.onend = onComplete;
      }
      speechSynthesis.speak(utterance);
    } else if (onComplete) {
      setTimeout(onComplete, 1000);
    }
  };

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, isTimerRunning]);

  // Select random questions based on chosen number
  const selectRandomQuestions = (questionsPool = allQuestions) => {
    const numQuestions = numberOfQuestions || 5;
    const shuffled = [...questionsPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(numQuestions, questionsPool.length));
  };

  const startQuiz = (retryQuestions = null) => {
    const questions = retryQuestions || selectRandomQuestions();
    setSelectedQuestions(questions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setCurrentAnswer('');
    setTimeLeft(20);
    setCurrentScreen('quiz');
    setIsTimerRunning(false);
    
    setTimeout(() => {
      speakText(questions[0].Question, () => {
        setIsTimerRunning(true);
      });
    }, 500);
  };

  const handleAnswerChange = (value) => {
    setCurrentAnswer(value);
  };

  const handleSubmit = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
      setTimeLeft(20);
      setIsTimerRunning(false);
      
      setTimeout(() => {
        speakText(selectedQuestions[currentQuestionIndex + 1].Question, () => {
          setIsTimerRunning(true);
        });
      }, 500);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = (answers) => {
    setIsTimerRunning(false);
    
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    
    let correctCount = 0;
    const incorrect = [];
    const allResults = [];
    
    selectedQuestions.forEach((question, index) => {
      const userAnswer = answers[index] || '';
      const isCorrect = userAnswer.trim().toLowerCase() === question.Answer.toLowerCase();
      
      const result = {
        question: question.Question,
        correctAnswer: question.Answer,
        userAnswer: userAnswer || 'No answer',
        isCorrect: isCorrect,
        originalQuestion: question
      };
      
      allResults.push(result);
      
      if (isCorrect) {
        correctCount++;
      } else {
        incorrect.push(result);
      }
    });

    setQuizResults({
      correct: correctCount,
      total: selectedQuestions.length,
      incorrect: incorrect,
      allResults: allResults
    });
    setIncorrectQuestions(incorrect);
    setCurrentScreen('results');
  };

  const retryIncorrectQuestions = () => {
    setIsRetryMode(true);
    const questionsToRetry = incorrectQuestions.map(item => item.originalQuestion);
    startQuiz(questionsToRetry);
  };

  const goToMainMenu = () => {
    setCurrentScreen('menu');
    setIsTimerRunning(false);
    setIsRetryMode(false);
    setQuizResults(null);
    setIncorrectQuestions([]);
    clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (currentScreen === 'quiz' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestionIndex, currentScreen]);

  if (currentScreen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-10 text-center max-w-lg w-full border border-gray-200">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Mental Math Quiz
            </h1>
            <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto w-24"></div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8 border-l-4 border-blue-500">
            <p className="text-gray-700 font-medium mb-2">
              Test your mental math skills with timed questions
            </p>
            <p className="text-sm text-gray-600">
              Each question has a 20-second timer and will be read aloud
            </p>
          </div>
          
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Choose the Number of Questions
            </label>
            <div className="mb-4">
              <input
                type="number"
                min="1"
                max={allQuestions.length}
                value={numberOfQuestions}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '') {
                    setNumberOfQuestions('');
                  } else {
                    const numValue = parseInt(value);
                    if (!isNaN(numValue)) {
                      setNumberOfQuestions(Math.min(Math.max(numValue, 1), allQuestions.length));
                    }
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === '' || parseInt(e.target.value) < 1) {
                    setNumberOfQuestions(1);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    startQuiz();
                  }
                }}
                className="w-32 p-3 text-xl font-semibold text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                placeholder="5"
              />
            </div>
            <p className="text-sm text-gray-500">
              Available questions: 1-{allQuestions.length}
            </p>
          </div>
          
          <button
            onClick={() => startQuiz()}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-3 w-full text-lg"
          >
            <Play size={20} />
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (currentScreen === 'quiz') {
    const progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-700">
                  Question {currentQuestionIndex + 1} of {selectedQuestions.length}
                </span>
                {isRetryMode && <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Retry Mode</span>}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} className={timeLeft <= 5 ? 'text-red-500' : 'text-gray-500'} />
                <span className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-gray-700'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                🎧 Listen to the Question
              </h2>
              <p className="text-gray-600">
                {isTimerRunning ? "Answer the question you heard" : "Listening..."}
              </p>
            </div>
            
            <div className="space-y-4">
              <input
                ref={inputRef}
                type="text"
                value={currentAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Enter your answer..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex-1"
                >
                  Submit Answer
                </button>
                <button
                  onClick={goToMainMenu}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Home size={16} />
                  Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'results') {
    const percentage = Math.round((quizResults.correct / quizResults.total) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {isRetryMode ? '🔄 Retry Results' : '🎉 Quiz Complete!'}
            </h1>
            
            <div className="text-6xl font-bold mb-4">
              <span className="text-green-500">{quizResults.correct}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{quizResults.total}</span>
            </div>
            
            <p className="text-xl text-gray-600 mb-2">
              You got {quizResults.correct} out of {quizResults.total} questions correct!
            </p>
            <p className="text-lg text-gray-500">
              That's {percentage}%
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📋 Complete Question Summary
            </h2>
            <div className="space-y-4">
              {quizResults.allResults.map((result, index) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {result.isCorrect ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✗</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 mb-2">
                        <strong>Q{index + 1}:</strong> {result.question}
                        <span className="text-sm text-gray-500 ml-2">
                          [{result.originalQuestion.Year} {result.originalQuestion.Type}]
                        </span>
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <p className={result.isCorrect ? 'text-green-700' : 'text-red-600'}>
                          <strong>Your answer:</strong> {result.userAnswer}
                        </p>
                        <p className="text-green-700">
                          <strong>Correct answer:</strong> {result.correctAnswer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {quizResults.incorrect.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-red-600 mb-4">
                ❌ Questions to Review:
              </h2>
              <p className="text-gray-600 mb-4">
                Focus on these {quizResults.incorrect.length} questions for improvement:
              </p>
              <div className="space-y-3">
                {quizResults.incorrect.map((item, index) => (
                  <div key={index} className="border border-red-200 rounded-lg p-3 bg-red-50">
                    <p className="font-medium text-gray-800 text-sm">
                      {item.question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-3">
              <button
                onClick={goToMainMenu}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Back to Main Menu
              </button>
              
              {quizResults.incorrect.length > 0 && (
                <button
                  onClick={retryIncorrectQuestions}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={20} />
                  Retry Incorrect Questions ({quizResults.incorrect.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MathQuizApp;