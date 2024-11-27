package com.project.intercapp.entities;

import jakarta.persistence.Embeddable;

@Embeddable
public class CPF {

    public final Long number;

    public CPF(Long number){
        this.number = number;
    }

    public Long getNumber() {
        return number;
    }

    private static boolean isValid(Long number) {

		int firstCheckDigit, secondCheckDigit, sum, remainder, j, k;
	    long CPFNumber;
	    int mult[] = new int[]{ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 };

	    if (number < 10000000000L || number > 99999999999L || number % 11111111111L == 0)
	        return false;

	    firstCheckDigit = (int) (number % 100 / 10);
	    secondCheckDigit  = (int) (number % 10);

	    CPFNumber = number / 100; 
	    sum = 0;
	    for (int i = 0; i < 9; i++)
	    {
	        sum += (CPFNumber % 10) * mult[i];
	        CPFNumber /= 10;
	    }

	    remainder = sum % 11;

	    if (remainder == 0 || remainder == 1)
	        j = 0;
	    else
	        j = 11 - remainder;

	    if (j != firstCheckDigit)
	        return false;

	    CPFNumber = number / 10;  
	    sum = 0;

	    for (int i = 0; i < 10; i++)
	    {
	        sum += (CPFNumber % 10) * mult[i];
	        CPFNumber /= 10;
	    }

	    remainder = sum % 11;

	    if (remainder == 0 || remainder == 1)
	        k = 0;
	    else
	        k = 11 - remainder;

	    return k == secondCheckDigit;
	}

}
