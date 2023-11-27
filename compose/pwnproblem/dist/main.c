#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<signal.h>
#include<unistd.h>

void handler(){
	exit(-1);
}

void hagaki_henkan(char* s, char* fr, char* to){
	for(int i = 0; s[i] != '\0'; i++){
		if(strncmp(&s[i],fr,strlen(fr)) == 0){
			int len = strlen(to);
			for(int j = 0; j < len; j++){
				s[i+j] = to[j];
			}
		}
	}
}

int main(){
	char pizza[32] = {};
	char fr[8]="は";
	char to[8]="き";
	char s[100] = {};
	int choice;
	FILE* fp;
	
	setbuf(stdin,NULL);
	setbuf(stdout,NULL);
	setbuf(stderr,NULL);
	
	signal(SIGALRM, handler);
	alarm(180);

	fp = fopen("flag","r");
	if(fp == NULL){
		puts("flagファイルを準備してください");
		exit(-1);
	}
	
	fgets(pizza,30,fp);
	fclose(fp);
	
	for(;;){
		printf("\n######################################################\n\n");
		printf("現在の変換ルール: %s が %s\n",fr,to);
		printf("1. ルール設定\n2. 変換\n3. ピザチャレンジ\n4. Finish\n> ");
		scanf("%d%*c",&choice);
		if(choice == 1){
			printf("ルール: ");
			memset(fr,0,sizeof(fr));
			memset(to,0,sizeof(to));
			scanf("%3sが%3s",fr,to);
		}else if(choice == 2){
			printf("入力: ");
			memset(s,0,sizeof(s));
			scanf("%60s",s);
			hagaki_henkan(s,fr,to);
			printf("変換結果: %s\n",s);
		}else if(choice == 3){
			printf("推測: ");
			fgets(s,strlen(pizza)+1,stdin);
			if(strncmp(s,pizza,strlen(pizza)) == 0){
				puts("正解！");
				system("cat flag");
			}else{
				puts("不正解...");
			}
		}else{
			break;
		}
	}
	return 0;
}
