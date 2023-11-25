import random

class Problem:
	def __init__(self):
		self.id = "instructionless_0"
		self.title = "Instructionless 0"
		self.desc = """
		## Sample Input 1
		
		    1
		
		
		## Sample Output 1
		
		    4
		
		
		## Sample Input 2
		
		    42
		
		
		## Sample Output 2
		
		    45
		
		
		## Sample Input 3
		
		    1234567
		
		
		## Sample Output 3
		
		    1234570
		
		
		"""
		
		st = random.getstate()
		random.seed(123)
		probs = []
		for i in range(10):
			v = random.randint(0,1000)
			probs.append({'in': f'{v}\n', 'out': f'{v+3}\n'})
		
		random.setstate(st)
		
		self.problems = probs
		
		
		
