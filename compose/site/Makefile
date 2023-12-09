build:
	docker build -t satosjp/dmoj-site:latest -f Dockerfile .

TAG=$$(date "+%Y%m%d-%H%M%S")

push:
	docker login
	docker push satosjp/dmoj-site:latest
	# @echo $(TAG)
	docker tag satosjp/dmoj-site:latest satosjp/dmoj-site:$(TAG)
	
	docker push satosjp/dmoj-site:$(TAG)
