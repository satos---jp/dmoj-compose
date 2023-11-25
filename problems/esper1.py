import random

class Problem:
	def __init__(self):
		self.id = "instructionless1"
		self.title = "Instructionless 1"
		self.desc = """
		## Sample Input 1
		
		    1
		
		
		## Sample Output 1
		
		    -1
		
		
		## Sample Input 2
		
		    42
		
		
		## Sample Output 2
		
		    1680
		
		
		## Sample Input 3
		
		    1234567
		
		
		## Sample Output 3
		
		    1524153208355
		
		
		"""
		
		st = random.getstate()
		random.seed(123)
		probs = []
		for i in range(10):
			v = random.randint(0,1000)
			probs.append({'in': f'{v}\n', 'out': f'{v**2-2*v}\n'})
		
		random.setstate(st)
		
		self.problems = probs
		
		
		
