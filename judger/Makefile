build:
	docker build -t satosjp/dmoj-judger:latest -f Dockerfile .

TAG=$$(date "+%Y%m%d-%H%M%S")

push:
	docker login
	docker push satosjp/dmoj-judger:latest
	# @echo $(TAG)
	docker tag satosjp/dmoj-judger:latest satosjp/dmoj-judger:$(TAG)
	
	docker push satosjp/dmoj-judger:$(TAG)
