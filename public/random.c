#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
        unsigned long long random;
        random = rand();

        unsigned long long key = 0;
        scanf("%lld", &key);

        if((key ^ random) == 4842686906){
                printf("Password is Correct: %lld\n", key);
                return 0;
        }

        printf("Wrong, maybe you should try 2^32 cases.\n");
        return 0;
}
