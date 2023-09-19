---
toc: false
comments: true
layout: hack
title: Documentation for Program With purose
description: PBL Unit 1 / Week 2 plan using Utterance
type: plans
courses: { compsci: {week: 4} }
---
# Chemistry Aid Tool and Calculator Documentation
## Introduction
This is a Python-based Chemistry Aid Tool and Calculator designed to assist users with various chemical calculations and conversions. It provides functionality for common chemical calculations, such as converting between moles and grams, moles and molecules, as well as performing calculations using the Ideal Gas Law (PV=nRT) and energy-frequency relationships (E = hv).

## Table of Contents
- Masses Dictionary
- Constants
- Functions
- moletogram()
- gramtomole()
- moletomolecule()
- gramtomolecule()
- PVnRT()
- Ehv()
- User Interface
- Usage


### 1. Masses Dictionary
The masses dictionary contains the atomic symbols of several elements as keys and their respective molar masses (in g/mol) as values. This dictionary is used for converting between moles and grams of elements.



### 2. Constants
A: Avogadro's constant, approximately equal to 6.022 × 10^23 mol⁻¹.
h: Planck's constant, approximately equal to 6.626 × 10⁻³⁴ J·s (joule-seconds).
These constants are used in various calculations throughout the program.


### 3. Functions
The program defines several functions to perform different chemical calculations and conversions.



### a. moletogram()
This function converts moles of an element to grams. It prompts the user to enter the elemental symbol and the number of moles and then calculates and displays the corresponding mass in grams.

### b. gramtomole()
This function converts grams of an element to moles. It prompts the user to enter the elemental symbol and the mass in grams and then calculates and displays the corresponding number of moles.



### c. moletomolecule()
This function converts moles to molecules. It prompts the user to enter the number of moles and then calculates and displays the corresponding number of molecules using Avogadro's constant.


### d. gramtomolecule()
This function converts grams to molecules. It prompts the user to enter the elemental symbol and the mass in grams, calculates the moles, and then calculates and displays the corresponding number of molecules using Avogadro's constant.



### e. PVnRT()
This function allows users to solve various gas law equations (PV=nRT) for different variables, including pressure (P), volume (V), number of moles (n), and temperature (T). It prompts the user to select the variable they want to solve for and then collects the necessary input data to perform the calculation.



### f. Ehv()
This function allows users to perform calculations related to energy (E) and frequency (v) using Planck's constant (h). Users can choose to solve for energy or frequency, and the function prompts for the required input data to perform the calculation.



## 4. User Interface
The program starts with a welcome message and presents a list of available actions, numbered from 1 to 6. Users can select an action by entering the corresponding number or exit the program by entering 'q'. The program continuously loops, allowing users to perform multiple calculations or exit at any time.


## 5. Usage
To use this Chemistry Aid Tool and Calculator:

Run the Python script.
Follow the on-screen instructions to select an action (1-6) or exit ('q').
Depending on the selected action, provide the required input data as prompted.
The program will perform the calculation and display the result.
Please ensure you have Python installed on your system to run this program.

Note: Ensure that the input provided follows the expected format and units for each calculation. Incorrect input may lead to erroneous results.

Enjoy using the Chemistry Aid Tool and Calculator!