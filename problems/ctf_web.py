import random

class Problem:
	def __init__(self):
		self.id = "Web"
		self.title = "Web"
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
		probs = [{'in': f'', 'out': 'ATGT{H0w_ab0u7_your_1st_SQL1}'}]
		
		random.setstate(st)
		
		self.problems = probs
		
		
		
