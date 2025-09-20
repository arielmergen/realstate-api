import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class QueryComplexityGuard implements CanActivate {
  private readonly maxComplexity = 1000;
  private readonly maxDepth = 10;

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    
    // Calcular complejidad de la query
    const complexity = this.calculateComplexity(info.fieldNodes[0]);
    const depth = this.calculateDepth(info.fieldNodes[0]);

    if (complexity > this.maxComplexity) {
      throw new HttpException(
        {
          message: `Query demasiado compleja. Complejidad: ${complexity}, Máximo: ${this.maxComplexity}`,
          code: 'QUERY_COMPLEXITY_EXCEEDED',
          complexity,
          maxComplexity: this.maxComplexity,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (depth > this.maxDepth) {
      throw new HttpException(
        {
          message: `Query demasiado profunda. Profundidad: ${depth}, Máximo: ${this.maxDepth}`,
          code: 'QUERY_DEPTH_EXCEEDED',
          depth,
          maxDepth: this.maxDepth,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }

  private calculateComplexity(fieldNode: any, depth = 0): number {
    if (!fieldNode || depth > this.maxDepth) return 0;

    let complexity = 1; // Base complexity for each field

    // Penalizar queries anidadas
    if (depth > 0) {
      complexity *= Math.pow(2, depth);
    }

    // Penalizar listas (arrays)
    if (fieldNode.kind === 'Field' && fieldNode.selectionSet) {
      const listFields = fieldNode.selectionSet.selections.filter(
        (selection: any) => selection.kind === 'Field'
      );
      complexity += listFields.length * 2;
    }

    // Recursivamente calcular complejidad de campos anidados
    if (fieldNode.selectionSet) {
      for (const selection of fieldNode.selectionSet.selections) {
        if (selection.kind === 'Field') {
          complexity += this.calculateComplexity(selection, depth + 1);
        }
      }
    }

    return complexity;
  }

  private calculateDepth(fieldNode: any, currentDepth = 0): number {
    if (!fieldNode || !fieldNode.selectionSet) return currentDepth;

    let maxDepth = currentDepth;

    for (const selection of fieldNode.selectionSet.selections) {
      if (selection.kind === 'Field') {
        const depth = this.calculateDepth(selection, currentDepth + 1);
        maxDepth = Math.max(maxDepth, depth);
      }
    }

    return maxDepth;
  }
}
